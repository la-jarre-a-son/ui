import React from 'react';
import { axe } from 'jest-axe';
import { render, screen } from '@testing-library/react';

import Icon from '../Icon';

import Breadcrumb from './Breadcrumb';
import BreadcrumbItem from './BreadcrumbItem';

describe('Breadcrumb', () => {
  it('render an accessible breadcrumb', async () => {
    const { container } = render(
      <Breadcrumb>
        <BreadcrumbItem aria-label="Home">
          <Icon name="fi fi-rr-home" />
        </BreadcrumbItem>
        <BreadcrumbItem>Organization</BreadcrumbItem>
        <BreadcrumbItem>Models</BreadcrumbItem>
        <BreadcrumbItem current>
          Detail
          <Icon name="fi fi-rr-search" />
        </BreadcrumbItem>
      </Breadcrumb>
    );

    expect(await axe(container)).toHaveNoViolations();
  });

  it('render the child items', () => {
    render(
      <Breadcrumb>
        <BreadcrumbItem aria-label="Home">item1</BreadcrumbItem>
        <BreadcrumbItem>item2</BreadcrumbItem>
        <BreadcrumbItem current>item3</BreadcrumbItem>
      </Breadcrumb>
    );

    const links = screen.getAllByRole('link');

    expect(links.length).toEqual(3);
    expect(links[links.length - 1].getAttribute('aria-current')).toEqual('page');
  });
});
