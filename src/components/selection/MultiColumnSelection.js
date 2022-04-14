import * as React from 'react';
// import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function MultipleSelectPlaceholder() {
  const persons = [
    { id: '1', firstName: 'Oliver', lastName: 'Hansen' },
    { id: '2', firstName: 'Van', lastName: 'Smith' },
  ];

  const [personName, setPersonName] = React.useState('');

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    setPersonName(value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300, mt: 3 }}>
        <Select
          displayEmpty
          value={personName}
          onChange={handleChange}
          // input={<OutlinedInput />}
          renderValue={(selected) => {
            if (selected) {
              let found = persons.find((item) => {
                return item.id === selected;
              });

              console.log('found', found);

              return found?.lastName;
            }
          }}
          MenuProps={MenuProps}
          inputProps={{ 'aria-label': 'Without label' }}
        >

          {persons.map((item) => {
            // console.log('item:', item);
            return (
              <MenuItem key={item.id} value={item.id}>
                <tr>
                  <td width={100}>{item.firstName}</td>
                  <td>{item.lastName}</td>
                </tr>
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
}
