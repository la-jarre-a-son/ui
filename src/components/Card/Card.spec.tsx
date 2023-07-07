import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Card from './Card';
import CardContent from './CardContent';
import CardHeader from './CardHeader';
import CardThumbnail from './CardThumbnail';
import CardThumbnailItem from './CardThumnailItem';
import CardThumbnailGrid from './CardThumbnailGrid';
import CardThumbnailOverlay from './CardThumbnailOverlay';

describe('Card', () => {
  it('render without crashing', async () => {
    render(<Card>content </Card>);

    const content = screen.getByText('content');

    expect(content).toBeInTheDocument();
  });

  it('can be interactive', async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();

    render(
      <>
        <button>button</button>
        <Card as="button" interactive onClick={onClick}>
          content
        </Card>
      </>
    );

    const button = screen.getByText('button');
    const card = screen.getByText('content');

    await user.click(button);
    await user.tab();

    expect(card).toHaveFocus();
    await user.keyboard(' ');

    expect(onClick).toHaveBeenCalled();
  });

  it('make use of the as prop', () => {
    render(<Card as="button">content</Card>);

    const buttonCard = screen.getByRole('button');

    expect(buttonCard).toBeInTheDocument();
  });

  describe('CardContent', () => {
    it('render without crashing', () => {
      render(<CardContent>content </CardContent>);

      const content = screen.getByText('content');

      expect(content).toBeInTheDocument();
    });

    it('make use of the as prop', () => {
      render(<CardContent as="button">content</CardContent>);

      const buttonCard = screen.getByRole('button');

      expect(buttonCard).toBeInTheDocument();
    });
  });

  describe('CardHeader', () => {
    it('render without crashing', () => {
      render(<CardHeader>content</CardHeader>);

      const content = screen.getByText('content');

      expect(content).toBeInTheDocument();
    });

    it('make use of the as prop', () => {
      render(<CardHeader as="button">content</CardHeader>);

      const buttonCard = screen.getByRole('button');

      expect(buttonCard).toBeInTheDocument();
    });

    it('can have an element left', () => {
      render(<CardHeader left={<div>left</div>}>content</CardHeader>);

      const left = screen.getByText('left');

      expect(left).toBeInTheDocument();
    });

    it('can have an element right', () => {
      render(<CardHeader left={<div>right</div>}>content</CardHeader>);

      const right = screen.getByText('right');

      expect(right).toBeInTheDocument();
    });
  });

  describe('CardThumbnail', () => {
    it('render without crashing', () => {
      render(<CardThumbnail alt="img" />);

      const content = screen.getByRole('img');

      expect(content).toBeInTheDocument();
    });

    it('make use of the as prop', () => {
      render(<CardThumbnail as="button" alt="img" />);

      const buttonCard = screen.getByRole('button');

      expect(buttonCard).toBeInTheDocument();
    });

    it('can have items as children', () => {
      render(
        <CardThumbnail alt="img">
          <CardThumbnailItem position="center">item</CardThumbnailItem>
        </CardThumbnail>
      );

      const item = screen.getByText('item');

      expect(item).toBeInTheDocument();
    });
  });

  describe('CardThumbnailOverlay', () => {
    it('Can be interactive', async () => {
      const user = userEvent.setup();
      const onClick = jest.fn();

      render(
        <>
          <button>button</button>
          <CardThumbnail alt="img" onClick={onClick}>
            <CardThumbnailOverlay data-testid="thumbnail" as="button" onClick={onClick} />
          </CardThumbnail>
        </>
      );

      const button = screen.getByText('button');
      const thumbnail = screen.getByTestId('thumbnail');

      await user.click(button);
      await user.tab();

      expect(thumbnail).toHaveFocus();
      await user.keyboard(' ');

      expect(onClick).toHaveBeenCalled();
    });
  });

  describe('CardThumbnailGrid', () => {
    it('render without crashing', () => {
      render(
        <CardThumbnailGrid>
          <CardThumbnail alt="img" />
          <CardThumbnail alt="img" />
          <CardThumbnail alt="img" />
        </CardThumbnailGrid>
      );

      const content = screen.getAllByRole('img');

      expect(content.length).toEqual(3);
    });

    it('make use of the as prop', () => {
      render(
        <CardThumbnailGrid as="button">
          <CardThumbnail alt="img" />
          <CardThumbnail alt="img" />
          <CardThumbnail alt="img" />
        </CardThumbnailGrid>
      );

      const buttonCard = screen.getByRole('button');

      expect(buttonCard).toBeInTheDocument();
    });

    it('can have no more than 3 children', () => {
      render(
        <CardThumbnailGrid as="button">
          <CardThumbnail alt="img" />
          <CardThumbnail alt="img" />
          <CardThumbnail alt="img" />
          <CardThumbnail alt="img" />
        </CardThumbnailGrid>
      );

      const buttonCard = screen.getByRole('button');

      expect(buttonCard).toBeInTheDocument();
      expect(buttonCard.childNodes.length).toBe(3);
    });
  });
});
