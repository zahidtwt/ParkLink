import { useState } from 'react';
import { Radio, RadioGroup, Tag, TagLabel } from '@chakra-ui/react';

function HourlyMonthlyForm({
  hourlySelected,
  monthlySelected,
  onHourlyChange,
  onMonthlyChange,
}) {
  const [hourlyHours, setHourlyHours] = useState('');

  const handleHourlyChange = (value) => {
    if (value === 'hourly') {
      onHourlyChange(true);
      onMonthlyChange(false);
    } else {
      onHourlyChange(false);
      onMonthlyChange(true);
    }
  };

  return (
    <>
      <RadioGroup
        value={hourlySelected ? 'hourly' : 'monthly'}
        onChange={(e) => handleHourlyChange(e.target.value)}>
        <Tag
          size='lg'
          key='hourly'
          borderRadius='full'
          variant={hourlySelected ? 'solid' : 'outline'}
          colorScheme={hourlySelected ? 'blue' : 'gray'}
          cursor='pointer'
          onClick={() => handleHourlyChange('hourly')}>
          <TagLabel>Hourly</TagLabel>
        </Tag>

        <Radio value='hourly' display='none' />

        <Tag
          size='lg'
          key='monthly'
          borderRadius='full'
          variant={monthlySelected ? 'solid' : 'outline'}
          colorScheme={monthlySelected ? 'blue' : 'gray'}
          cursor='pointer'
          onClick={() => handleHourlyChange('monthly')}>
          <TagLabel>Monthly</TagLabel>
        </Tag>

        <Radio value='monthly' display='none' />
      </RadioGroup>

      {hourlySelected && (
        <input
          type='text'
          placeholder='Hours'
          value={hourlyHours}
          onChange={(e) => setHourlyHours(e.target.value)}
        />
      )}

      {monthlySelected && <input type='text' placeholder='Rate' />}
    </>
  );
}

export default HourlyMonthlyForm;
