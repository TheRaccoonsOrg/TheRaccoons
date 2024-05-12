import TestChoice from './TestChoice';
import TestDescription from './TestDescription';
import TestInstruction from './TestInstruction';

const TestSection = () => {
  return (
    <div>
      <TestDescription />
      <TestInstruction />
      <TestChoice />
    </div>
  );
};

export default TestSection;
