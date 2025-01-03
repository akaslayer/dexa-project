function sendResponse(statusCode, message, data = []) {
    return {
      statusCode: statusCode,
      message: message,
      success: true,
      data: data,
    };
  }


  function sendResponsePagination(statusCode, message, data = [],totalPage,totalData,page) {
    return {
      statusCode: statusCode,
      message: message,
      success: true,
      data: data,
      totalPages:totalPage,
      totalData:totalData,
      currentPage:page
    };
  }


function failResponseServer(statusCode, message,error) {
    return {
      statusCode: statusCode,
      message: message,
      success: false,
      serverMessage:error,
    };
  }

module.exports = {
    sendResponse,
    failResponseServer,
    sendResponsePagination
};