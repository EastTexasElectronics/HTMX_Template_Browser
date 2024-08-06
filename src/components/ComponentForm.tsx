// htb/src/components/ComponentForm.tsx
'use client';
import React, { useState, useId } from 'react';
import Select, { type MultiValue } from 'react-select';

const categories = [
  'Accordion', 'Alerts', 'Avatar', 'Badge', 'Banner', 'Bottom Navigation', 'Breadcrumb', 'Buttons', 'Button Group', 'Card', 'Carousel', 'Chat Bubble', 'Checkbox', 'Clipboard', 'Datepicker', 'Device Mockups', 'Drawer', 'Dropdown', 'Dropdowns', 'Feedback', 'File Input', 'Floating Label', 'Footer', 'Form', 'Forms', 'Gallery', 'Headings', 'HR', 'Images', 'Indicators', 'Input', 'Input Field', 'Jumbotron', 'KBD', 'Layout', 'Links', 'List Group', 'Lists', 'Mega Menu', 'Modal', 'Navbar', 'Navigation', 'Number Input', 'Pagination', 'Paragraphs', 'Phone Input', 'Popover', 'Progress', 'Radio', 'Range', 'Rating', 'Search Input', 'Select', 'Sidebar', 'Skeleton', 'Spinner', 'Stepper', 'Surfaces', 'Tables', 'Tabs', 'Textarea', 'Text', 'Timepicker', 'Timeline', 'Toast', 'Toggle', 'Tooltips', 'Typography', 'Utilities', 'Video',
];

type CategoryOption = {
  value: string;
  label: string;
};

type FormProps = {
  name: string;
  setName: (name: string) => void;
  selectedCategories: MultiValue<CategoryOption>;
  setSelectedCategories: (categories: MultiValue<CategoryOption>) => void;
  description: string;
  setDescription: (description: string) => void;
  tags: string;
  setTags: (tags: string) => void;
};

const ComponentForm: React.FC<FormProps> = ({
  name,
  setName,
  selectedCategories,
  setSelectedCategories,
  description,
  setDescription,
  tags,
  setTags
}) => {
  const categoryOptions = categories.map((cat) => ({ value: cat, label: cat }));
  const id = useId();

  return (
    <section className="mb-12 max-w-md mx-auto">
      <div className="mb-4">
        <label htmlFor={`${id}-name`} className="block text-gray-400">Component Name</label>
        <input
          id={`${id}-name`}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-white"
        />
      </div>
      <div className="mb-4">
        <label htmlFor={`${id}-categories`} className="block text-gray-400">Categories</label>
        <Select
          inputId={`${id}-categories`}
          isMulti
          value={selectedCategories}
          onChange={(selectedOptions) => setSelectedCategories(selectedOptions)}
          options={categoryOptions}
          className="mt-1 block w-full text-gray-800"
          placeholder="Select up to 3 categories"
          styles={{
            control: (base) => ({
              ...base,
              backgroundColor: '#2d3748',
              borderColor: '#4a5568',
              color: 'white',
            }),
            menu: (base) => ({
              ...base,
              backgroundColor: '#2d3748',
            }),
            multiValue: (base) => ({
              ...base,
              backgroundColor: '#4a5568',
            }),
            multiValueLabel: (base) => ({
              ...base,
              color: 'white',
            }),
            multiValueRemove: (base) => ({
              ...base,
              color: 'white',
              ':hover': {
                backgroundColor: '#2d3748',
                color: 'white',
              },
            }),
            singleValue: (base) => ({
              ...base,
              color: 'white',
            }),
            input: (base) => ({
              ...base,
              color: 'white',
            }),
            placeholder: (base) => ({
              ...base,
              color: '#a0aec0',
            }),
          }}
        />
      </div>
      <div className="mb-4">
        <label htmlFor={`${id}-description`} className="block text-gray-400">Description</label>
        <textarea
          id={`${id}-description`}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-white"
        />
      </div>
      <div className="mb-4">
        <label htmlFor={`${id}-tags`} className="block text-gray-400">Tags (comma separated)</label>
        <input
          id={`${id}-tags`}
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-white"
        />
      </div>
    </section>
  );
};

export default ComponentForm;
