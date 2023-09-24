import { useState } from 'react';
// ============ Section ============
import Section from '../Section/Section';
// ============ Searchbar ============
import Searchbar from '../Searchbar/Searchbar';
// ============ Gallery ============
import Gallery from 'components/Gallery/Gallery';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Function that sets the state with the dataForm value upon submission.
  const handleSubmit = dataForm => {
    setSearchQuery(dataForm);
  };

  return (
    <>
      <Searchbar onSubmit={handleSubmit}></Searchbar>
      <Section>
        <Gallery searchQuery={searchQuery}></Gallery>
      </Section>
    </>
  );
};

export default App;
