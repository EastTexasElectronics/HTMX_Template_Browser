'use client';
import React, { useState } from 'react';
import HTMXCodeSandbox from '../../_components/HTMXCodeSandbox';
import Select, { type MultiValue } from 'react-select';

const categories = [
  'Accordion', 'Alerts', 'Avatar', 'Badge', 'Banner', 'Bottom Navigation', 'Breadcrumb', 'Buttons', 'Button Group', 'Card', 'Carousel', 'Chat Bubble', 'Checkbox', 'Clipboard', 'Datepicker', 'Device Mockups', 'Drawer', 'Dropdown', 'Dropdowns', 'Feedback', 'File Input', 'Floating Label', 'Footer', 'Form', 'Forms', 'Gallery', 'Headings', 'HR', 'Images', 'Indicators', 'Input', 'Input Field', 'Jumbotron', 'KBD', 'Layout', 'Links', 'List Group', 'Lists', 'Mega Menu', 'Modal', 'Navbar', 'Navigation', 'Number Input', 'Pagination', 'Paragraphs', 'Phone Input', 'Popover', 'Progress', 'Radio', 'Range', 'Rating', 'Search Input', 'Select', 'Sidebar', 'Skeleton', 'Spinner', 'Stepper', 'Surfaces', 'Tables', 'Tabs', 'Textarea', 'Text', 'Timepicker', 'Timeline', 'Toast', 'Toggle', 'Tooltips', 'Typography', 'Utilities', 'Video',
];

type CategoryOption = {
  value: string;
  label: string;
};

const CreateComponent: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [selectedCategories, setSelectedCategories] = useState<MultiValue<CategoryOption>>([]);
  const [description, setDescription] = useState<string>('');
  const [tags, setTags] = useState<string>('');
  const [submissionStatus, setSubmissionStatus] = useState<string>('');

  const submitComponent = async () => {
    const iframe = document.querySelector<HTMLIFrameElement>('iframe');
    if (iframe) {
      const doc = iframe.contentDocument;
      if (doc) {
        const code = doc.documentElement.outerHTML;
        const tagList = tags.split(',').map(tag => tag.trim()).filter(tag => tag);

        const componentDetails = {
          name,
          categories: selectedCategories.map(category => category.value),
          description,
          tags: tagList,
          code,
        };

        console.log('Component submitted:', code);
        console.log('Component details:', componentDetails);

        setSubmissionStatus('Submitting...');

        try {
          const response = await fetch('/api/components', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(componentDetails),
          });

          if (response.ok) {
            console.log('Component successfully submitted');
            setSubmissionStatus('Component successfully submitted!');
          } else {
            console.error('Failed to submit component', response);
            setSubmissionStatus('Failed to submit component');
          }
        } catch (error) {
          console.error('Error during submission', error);
          setSubmissionStatus('Error during submission');
        }
      }
    }
  };

  const categoryOptions = categories.map((cat) => ({ value: cat, label: cat }));

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <header className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Create Your Component</h1>
        <p className="text-gray-400">Build, preview, and share your custom HTMX components.</p>
      </header>
      <main>
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Instructions</h2>
          <p className="text-gray-400 mb-4">
            Use the code sandbox below to create and preview your component. Fill out the component details, write your HTML and HTMX code, and see the live preview. You can copy the code in HTMX or Templ format.
          </p>
          <ul className="list-disc list-inside text-gray-400">
            <li>Enter a name for your component.</li>
            <li>Select up to three appropriate categories.</li>
            <li>Provide an optional description.</li>
            <li>Write your HTML and HTMX code in the editor.</li>
            <li>Click the copy button to copy the code in the desired format.</li>
          </ul>
        </section>
        <section className="mb-12 max-w-md mx-auto">
          <div className="mb-4">
            <label className="block text-gray-400">Component Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-white"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-400">Categories</label>
            <Select
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
            <label className="block text-gray-400">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-white"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-400">Tags (comma separated)</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-white"
            />
          </div>
        </section>
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Code Sandbox</h2>
          <HTMXCodeSandbox />
        </section>
        <section className="mb-12">
          <button
            onClick={submitComponent}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Submit Component
          </button>
          {submissionStatus && (
            <p className="mt-2 text-sm text-gray-400">{submissionStatus}</p>
          )}
        </section>
        <section className="mb-12">
          <h3 className="text-xl font-bold mb-4">Posting Guidelines</h3>
          <ul className="list-disc list-inside text-gray-400 pl-4">
            <li>Ensure your component is self-contained and functional.</li>
            <li>Use standard HTML, CSS, and JavaScript.</li>
            <li>Avoid external dependencies unless necessary.</li>
            <li>Include a descriptive title and comments in your code.</li>
          </ul>
        </section>
      </main>
    </div>
  );
};

export default CreateComponent;
