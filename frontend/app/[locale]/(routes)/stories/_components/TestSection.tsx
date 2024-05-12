import TestChoice from './TestChoice';
import TestDescription from './testDescription';
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
