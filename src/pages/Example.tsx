import React, { useState } from 'react';
import { Button } from '../components/ui/form-controls/Button';
import { PlusIcon, MinusIcon } from 'lucide-react';
import { Checkbox } from '../components/ui/form-controls/Checkbox';
import { Input } from '../components/ui/form-controls/Input';
import { Radio } from '../components/ui/form-controls/Radio';
import { Select } from '../components/ui/form-controls/Select';
import { Textarea } from '../components/ui/form-controls/Textarea';
import Dropdown from '../components/ui/Dropdown';
import { Tabs } from '../components/ui/Tab';

const Example: React.FC = () => {
  const [selectedValue, setSelectedValue] = useState('Select an option');

  const handleClick = () => {
    alert('Button Clicked!');
  };

  const handleDropdownSelect = (value: string) => {
    setSelectedValue(value);
  };

  const renderSection = (title: string, content: React.ReactNode) => (
    <div className="mb-4 rounded-lg bg-white p-4 shadow-md">
      <h2 className="mb-2 text-lg font-semibold">{title}</h2>
      <div className="flex flex-wrap gap-2">{content}</div>
    </div>
  );

  const tabs = [
    {
      id: 'tab1',
      label: 'Tab 1',
      content: <div>This is the content for Tab 1</div>,
    },
    {
      id: 'tab2',
      label: 'Tab 2',
      content: <div>This is the content for Tab 2</div>,
    },
    {
      id: 'tab3',
      label: 'Tab 3',
      content: <div>This is the content for Tab 3</div>,
    },
  ];

  return (
    <div className="mx-auto max-w-2xl p-4">
      <h1 className="mb-6 text-center text-2xl font-bold">
        UI Component Examples
      </h1>

      {renderSection(
        'Buttons',
        <>
          <Button onClick={handleClick}>Click Me</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button size="sm">Small Button</Button>
          <Button size="md">Medium Button</Button>
          <Button size="lg">Large Button</Button>
          <Button isLoading>Loading...</Button>
          <Button leftIcon={<PlusIcon />}>Add Item</Button>
          <Button rightIcon={<MinusIcon />}>Remove Item</Button>
          <Button variant="danger" disabled>
            Disabled Button
          </Button>
        </>,
      )}

      {renderSection(
        'Dropdown',
        <Dropdown
          options={[
            { value: 'option1', label: 'Option 1' },
            { value: 'option2', label: 'Option 2' },
            { value: 'option3', label: 'Option 3' },
          ]}
          onSelect={handleDropdownSelect}
          selectedValue={selectedValue}
        />,
      )}

      {renderSection('Tabs', <Tabs tabs={tabs} />)}

      {renderSection(
        'Checkboxes',
        <>
          <Checkbox label="Accept Terms" />
          <Checkbox
            label="Subscribe to Newsletter"
            error="This field is required."
          />
          <Checkbox
            label="Enable Notifications"
            helperText="You can change this later."
          />
        </>,
      )}

      {renderSection(
        'Inputs',
        <>
          <Input label="Username" placeholder="Enter your username" />
          <Input
            label="Password"
            type="password"
            error="Password is required."
          />
          <Input label="Email" helperText="We will never share your email." />
        </>,
      )}

      {renderSection(
        'Radio Buttons',
        <>
          <Radio name="options" label="Option 1" />
          <Radio
            name="options"
            label="Option 2"
            error="Please select an option."
          />
        </>,
      )}

      {renderSection(
        'Select Dropdown',
        <>
          <Select
            label="Choose an option"
            options={[
              { value: 'option1', label: 'Option 1' },
              { value: 'option2', label: 'Option 2' },
            ]}
          />
          <Select
            label="Disabled Select"
            options={[
              { value: 'option1', label: 'Option 1' },
              { value: 'option2', label: 'Option 2' },
            ]}
            disabled
          />
        </>,
      )}

      {renderSection(
        'Textareas',
        <>
          <Textarea
            label="Description"
            placeholder="Enter your description here."
          />
          <Textarea label="Notes" error="Notes cannot be empty." />
        </>,
      )}
    </div>
  );
};

export default Example;
