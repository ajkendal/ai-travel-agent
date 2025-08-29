import { fetchData } from '../utils/ApiCall';

const FormPage = () => {
  const handleSubmit = async (formData: any) => {
    const response = await fetchData(formData);
    console.log(response);
  };

  return (
    <>
      <h1> Form Page</h1>
      <button onClick={() => handleSubmit({})}>Submit</button>
    </>
  );
};

export default FormPage;
