import { saveAs } from 'file-saver';
import XlsxPopulate from 'xlsx-populate';

export const getDimenssion = (event, setfirst) => {
  var file, img;
  file = event.target.files[0];
  img = new Image();
  var objectUrl = URL.createObjectURL(file);
  img.src = objectUrl;
  img.onload = function () {
    setfirst({ width: img.naturalWidth, height: img.naturalHeight });
  };
};

export const validation = (values) => {
  const errors = {};
  if (!values.name) errors.name = 'Name is required';

  if (!values.email) errors.email = 'Email is required';
  else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.age) errors.age = 'Age is required';
  else if (isNaN(Number(values.age))) {
    errors.age = 'Age must be a number';
  }

  if (!values.city) errors.city = 'City is required';

  if (!values.phone) errors.phone = 'Phone is required';
  else if (isNaN(Number(values.phone))) {
    errors.phone = 'Phone must be a number';
  }
  return errors;
};
export const loginValidation = (values) => {
  const errors = {};
  if (!values.email) errors.email = 'Email is required';
  else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.password) errors.password = 'Password is required';
  return errors;
};

export const secondsToMinutes = (time) => {
  return (
    Math.floor(time / 60).toFixed(0) +
    ':' +
    Math.floor(time % 60)
      .toFixed(0)
      .padStart(2, '0')
  );
};

export const saveAsExcel = (data) => {
  if (data.lngth === 0) return;
  let header = ['Age', 'City', 'Date', 'Email', 'Name', 'Phone', 'Room Id'];

  XlsxPopulate.fromBlankAsync().then(async (workbook) => {
    const sheet1 = workbook.sheet(0);
    const sheetData = getSheetData(data, header);
    const totalColumns = sheetData[0].length;

    sheet1.cell('A1').value(sheetData);
    const range = sheet1.usedRange();
    const endColumn = String.fromCharCode(64 + totalColumns);
    sheet1.row(1).style('bold', true);
    sheet1.range('A1:' + endColumn + '1').style('fill', 'BFBFBF');
    range.style('border', true);
    workbook.outputAsync().then((res) => {
      saveAs(res, `${new Date().getTime()}_game_users.xlsx`);
    });
    return false;
  });
};

const getSheetData = (data, header) => {
  var fields = Object.keys(data[0]);
  var sheetData = data.map(function (row) {
    return fields.map(function (fieldName) {
      return row[fieldName] ? row[fieldName] : '';
    });
  });
  sheetData.unshift(header);
  return sheetData;
};

export const objectToArray = (obj) => {
  return Object.keys(obj).map((key) => {
    return {
      ...obj[key],
    };
  });
};
