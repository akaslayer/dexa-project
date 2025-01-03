const useAttendences = () => {
  const fetchAllAttendences = async (
    currentPage: any,
    id: string | undefined
  ) => {
    const response = await fetch(
      `http://localhost:4000/attendances/${id}?page=${currentPage}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
    return data;
  };

  const fetchEmployeeAttendanceToday = async () => {
    const token = localStorage.getItem("site");
    if (!token) {
      throw new Error("Authentication token is missing.");
    }
    const response = await fetch(`http://localhost:4000/attendances/today`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  };

  const createNewEmployeeAttendance = async (formData: any) => {
    const token = localStorage.getItem("site");
    if (!token) {
      throw new Error("Authentication token is missing.");
    }
    const response = await fetch(`http://localhost:4000/attendances`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    const data = await response.json();
    return data;
  };

  const updateEmployeeAttendance = async (formData: any) => {
    const token = localStorage.getItem("site");
    if (!token) {
      throw new Error("Authentication token is missing.");
    }
    const response = await fetch(`http://localhost:4000/attendances`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    const data = await response.json();
    return data;
  };

  return {
    fetchAllAttendences,
    fetchEmployeeAttendanceToday,
    createNewEmployeeAttendance,
    updateEmployeeAttendance,
  };
};

export default useAttendences;
