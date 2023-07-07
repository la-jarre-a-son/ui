import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import SidebarContainer from './SidebarContainer';
import { axe } from 'jest-axe';

describe('Sidebar', () => {
  it('not opened', () => {
    render(<SidebarContainer sidebar={<div>sidebar</div>}>content</SidebarContainer>);

    const content = screen.queryByText('content');
    const sidebar = screen.queryByText('sidebar');

    expect(content).toBeInTheDocument();
    expect(sidebar).not.toBeInTheDocument();
  });

  it('can be opened', async () => {
    const { container } = render(
      <SidebarContainer sidebar={<div>sidebar</div>} open>
        content
      </SidebarContainer>
    );

    let content: any;
    let sidebar: any;
    await waitFor(() => {
      sidebar = screen.getByText('sidebar');
      content = screen.getByText('content');
    });

    expect(content).toBeInTheDocument();
    expect(sidebar).toBeInTheDocument();
    expect(await axe(container)).toHaveNoViolations();
  });
});
