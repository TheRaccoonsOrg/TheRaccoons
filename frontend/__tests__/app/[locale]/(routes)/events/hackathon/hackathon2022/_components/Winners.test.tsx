import { render, screen } from '@/__tests__/utils/test-wrapper';
import Winners from '@/app/[locale]/(routes)/events/hackathons/hackathon2022/_components/Winners';

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
          'Together with the help of mentors and organizers they managed to build real solutions under one of the chosen challenges:',
        )
      );
    });
    expect(paragraph).toBeInTheDocument();

    const span = screen.getByText('Sustainability, Deep Science, Data & Healthcare, Game Design.', {
      selector: 'span',
    });
    expect(span).toBeInTheDocument();
    expect(span).toHaveClass('text-hotgreen');

    const textAfterSpan =
      'Overall 18 teams submitted their ideas and managed to present what they had built to compete for the best prizes.';
    expect(paragraph).toHaveTextContent(textAfterSpan);
  });
});
