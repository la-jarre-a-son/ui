import React, { useContext, useMemo } from 'react';
import { PureArgsTable } from '@storybook/addon-docs';
import { DocsContext, Heading } from '@storybook/addon-docs';

type Variable = { name: string; value: string; isDefault?: boolean };
type ThemingParameters = { css: Variable[]; scss: Variable[]; external: Variable[] };

const REGEX_SCSS_VARIABLES = /(\$[a-z0-9\-_]+)(:\s*(.+?)(\s*!default)?\s*;)?/;
const REGEX_CSS_CUSTOM_PROPS =
    /var\(\s*(--[a-z0-9\-_#{}$]+)(\s*,\s*(\$[a-z0-9\-_]+|#{([^}]+)}))?\s*\)/;
const REGEX_CSS_TYPOGRAPHY = new RegExp(
    /_textStyle\(\s*[^,]+\s*,\s*(--[a-z0-9\-_#{}$]+)\s*,\s*([^;]+)\s*\);/,
    'gi'
);
const REGEX_CSS_CUSTOM_PROPS_SCSS_INJECTIONS = new RegExp(/\#\{\$([a-z0-9\-_]+)\}/, 'gi');
const REGEX_SCSS_IGNORE_VARIABLES = new RegExp(/^\$[a-z]+$/, 'i');
const TYPOGRAPHY_PROPERTIES = [
    'fontFamily',
    'fontWeight',
    'fontSize',
    'letterSpacing',
    'lineHeight',
];

const isSCSSComponentVariable = (componentName: string) => (v: Variable) =>
    v.name.startsWith(`$${componentName}-`) || v.name.startsWith(`$${componentName}_`);
const isCSSComponentCustomProp = (componentName: string) => (v: Variable) =>
    v.name.startsWith(`--${componentName}-`) || v.name.startsWith(`--${componentName}_`);

const not = (fn: (v: Variable) => boolean) => (v: Variable) => !fn(v);

const uniq = (values?: Array<any> | null) =>
    Array.isArray(values) ? Array.from(new Set(values)) : [];

const getVariablesPreferablyWithValue = (variables: Variable[]) => {
    const variablesWithValue = new Set(variables.map((v) => (v.value ? v.name : null)));

    const variablesPreferablyWithValue = variables.filter((v) =>
        v.value ? true : !variablesWithValue.has(v.name)
    );

    return variablesPreferablyWithValue;
};

function extractSCSSVariables(data: string): Variable[] {
    if (typeof data !== 'string') return [];

    const matches = data.match(new RegExp(REGEX_SCSS_VARIABLES, 'gi'));

    const variables = uniq(matches)
        .map((v) => {
            const match = v.match(new RegExp(REGEX_SCSS_VARIABLES, 'i'));
            if (!match) return null;
            return {
                name: match[1],
                value: match[3],
                isDefault: !!match[4],
            };
        })
        .filter((v) => v && !v.name.match(REGEX_SCSS_IGNORE_VARIABLES)) as Variable[];

    return getVariablesPreferablyWithValue(variables);
}

function extractCSSTypographyCustomProps(data: string): Variable[] {
    if (typeof data !== 'string') return [];

    const matches = data.match(new RegExp(REGEX_CSS_TYPOGRAPHY, 'gi'));

    const variables = Array.from(new Set(matches))
        .reduce((all, v) => {
            const match = v.match(new RegExp(REGEX_CSS_TYPOGRAPHY, 'i'));
            if (match) {
                return all.concat(
                    TYPOGRAPHY_PROPERTIES.map((prop) => ({
                        name: `${match[1]}_${prop}`.replace(
                            REGEX_CSS_CUSTOM_PROPS_SCSS_INJECTIONS,
                            '{$1}'
                        ),
                        value: match[2],
                    }))
                );
            }
            return all;
        }, [] as Variable[])
        .filter(Boolean) as Variable[];

    return getVariablesPreferablyWithValue(variables);
}

function extractCSSCustomProps(data: string): Variable[] {
    if (typeof data !== 'string') return [];

    const matches = data.match(new RegExp(REGEX_CSS_CUSTOM_PROPS, 'gi'));

    const variables = Array.from(new Set(matches))
        .map((v) => {
            const match = v.match(new RegExp(REGEX_CSS_CUSTOM_PROPS, 'i'));
            if (!match) return null;
            return {
                name: match[1].replace(REGEX_CSS_CUSTOM_PROPS_SCSS_INJECTIONS, '{$1}'),
                value: match[4] || match[3],
            };
        })
        .filter(Boolean) as Variable[];

    return getVariablesPreferablyWithValue(variables);
}

export function extractThemeVariables(
    fileData: string | string[],
    componentName: string
): ThemingParameters {
    const data = (Array.isArray(fileData) ? fileData.join('') : fileData).replace(
        /(\r\n|\n|\r)/gm,
        ' '
    );

    const allFromSCSS = extractSCSSVariables(data);
    const allFromCSS = [...extractCSSCustomProps(data), ...extractCSSTypographyCustomProps(data)];

    const scss = allFromSCSS.filter(isSCSSComponentVariable(componentName));
    const css = allFromCSS.filter(isCSSComponentCustomProp(componentName));
    // const external = [
    //     ...allFromSCSS.filter(not(isSCSSComponentVariable(componentName))),
    //     ...allFromCSS.filter(not(isCSSComponentCustomProp(componentName))),
    // ];

    return {
        css,
        scss,
        external: [], // ignore these, in a same variable file there are many components
    };
}


const mapVariablesToArgsTableRows = (variables: { css: Variable[],scss: Variable[], external: Variable[]}) => {
    let rows = {};
    
    for (const v in variables) {
        rows = variables[v as keyof typeof variables].reduce((previousRows: {[key: string]: { name: String, defaultValue: {summary: String}, table: {category: string}}}, { name, value }: Variable) => {
            previousRows[name] = { name, defaultValue: {summary: value}, table: { category: v } };
            return previousRows;
        }, rows);
    }

    return rows
}

export const VariablesTable: React.FC<ThemingParameters> = (variables) => {
    const rows = useMemo(() => mapVariablesToArgsTableRows(variables), [variables]);
    return (<PureArgsTable rows={rows} />);
}


export const Theming = () => {
    const { storyById } = useContext(DocsContext);
    const { parameters } = storyById();
    const { css, scss, external } = parameters.theming ?? {};

    if (!css?.length && !scss?.length && !external?.length) return null;

    return (
        <>
            <Heading>Theming</Heading>
            <VariablesTable css={css} scss={scss} external={external} />
        </>
    );
};
