const useEmployees = () => {
  const fetchAllEmployees = async (currentPage: any) => {
    const response = await fetch(
      `http://localhost:4000/users?page=${currentPage}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    return data;
  };

  const updateEmployee = async (formData: any) => {
    const response = await fetch(`http://localhost:4000/users`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    return data;
  };

  const createNewEmployee = async (formData: any) => {
    const response = await fetch(`http://localhost:4000/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    return data;
  };

  return { fetchAllEmployees, updateEmployee, createNewEmployee };
};

export default useEmployees;
