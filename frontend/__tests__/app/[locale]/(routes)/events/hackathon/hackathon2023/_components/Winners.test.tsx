import { render, screen } from '@/__tests__/utils/test-wrapper';
import Winners from '@/app/[locale]/(routes)/events/hackathons/hackathon2023/_components/Winners';

describe('Winners', () => {
  it('renders the heading correctly', () => {
    render(<Winners />);

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Winners');
  });

  it('renders the paragraph and span text correctly', () => {
    render(<Winners />);

    const title = screen.getByRole('heading', { level: 2 });
    expect(title).toContainHTML('Winners');
    expect(title).toBeInTheDocument();

    const paragraph = screen.getByText((content, element) => {
      return (
        element!.tagName.toLowerCase() === 'p' &&
        content.includes(
          'Together with the help of mentors and organizers, 32 teams managed to build real solutions in 48 hours under one of the chosen challenges:',
        )
      );
    });
    expect(paragraph).toBeInTheDocument();

    const span = screen.getByText(
      'Sustainability & Data, Deep Science, GameDev and Your Challenge.',
      {
        selector: 'span',
      },
    );
    expect(span).toBeInTheDocument();
    expect(span).toHaveClass('text-hotgreen');

    const textAfterSpan =
      'After an intensive pitching session, the decisions of the jury were announced at the Awarding Ceremony, and the best-performing teams received valuable prizes.';
    expect(paragraph).toHaveTextContent(textAfterSpan);
  });
});
