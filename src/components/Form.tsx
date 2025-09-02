import { fetchData } from '../utils/ApiCall';

const FormPage = () => {
  const handleSubmit = async (formData: any) => {
    const response = await fetchData(formData);
    console.log(response);
  };

  return <></>;
};

export default FormPage;
