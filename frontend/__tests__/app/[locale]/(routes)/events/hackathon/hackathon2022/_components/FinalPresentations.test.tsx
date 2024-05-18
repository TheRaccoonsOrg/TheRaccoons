import { render, screen, within } from '@/__tests__/utils/test-wrapper';
import FinalPresentations from '@/app/[locale]/(routes)/events/hackathons/hackathon2022/_components/FinalPresentations';

jest.mock('@/components/hackathon/skeletons/ImageWithSkeleton', () => {
  return function DummyImageWithSkeleton({ src, alt }: { src: string; alt: string }) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} data-testid="image-with-skeleton" />;
  };
});
describe('FinalPresentations', () => {
  it('renders correctly', () => {
    render(<FinalPresentations />);

    const title = screen.getByRole('heading', { level: 2 });
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Final Presentations');

    const paragraph = screen.getByText((content, element) => {
      return (
        element!.tagName.toLowerCase() === 'p' &&
        content.includes('The hackathon took place between the')
      );
    });
    expect(paragraph).toBeInTheDocument();

    const textBeforeSpan = 'The hackathon took place between the';
    expect(paragraph).toHaveTextContent(textBeforeSpan);

    const span = within(paragraph).getByText('25th and 27th of November');
    expect(span).toBeInTheDocument();
    expect(span).toHaveClass('text-hotgreen mx-1');

    const textAfterSpan =
      'in the University of Latvia House of Science in Riga, Latvia. It was organized by the student community The Raccoons together with the University of Latvia Student Council.';
    expect(paragraph).toHaveTextContent(textAfterSpan);

    const secondParagraph = screen.getByText((content, element) => {
      return (
        element!.tagName.toLowerCase() === 'p' &&
        content.includes(
          'The event gathered high school and university students to develop their ideas',
        )
      );
    });
    expect(secondParagraph).toBeInTheDocument();

    const image = screen.getByTestId('image-with-skeleton');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/images/hackathon2023/raccoon2.webp');
    expect(image).toHaveAttribute('alt', 'Raccoon');
  });
});
