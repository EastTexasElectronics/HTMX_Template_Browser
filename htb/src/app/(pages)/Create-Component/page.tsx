// htb/src/app/(pages)/Create-Component/page.tsx
'use client';
import React, { useState } from 'react';
import HTMXCodeSandbox from '@/components/HTMXCodeSandbox';
import CreateComponentHeader from '@/components/CreateComponentHeader';
import ComponentForm from '@/components/ComponentForm';
import Instructions from '@/components/Instructions';
import PostingGuidelines from '@/components/PostingGuidelines';
import { type MultiValue } from 'react-select';

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

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <CreateComponentHeader />
      <main>
        <Instructions />
        <ComponentForm
          name={name}
          setName={setName}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          description={description}
          setDescription={setDescription}
          tags={tags}
          setTags={setTags}
        />
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
        <PostingGuidelines />
      </main>
    </div>
  );
};

export default CreateComponent;
