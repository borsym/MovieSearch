import * as React from 'react';

import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';

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

const getStyles = (name: string, context: readonly string[], theme: Theme) => {
  return {
    fontWeight:
      context.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
};

interface Props {
  loading: boolean;
  title: string;
  items: string[];
  context: string[];
  add: (genre: string[]) => void;
}
const MultipleSelectChip: React.FC<Props> = ({
  loading,
  title,
  items,
  context,
  add,
}) => {
  const theme = useTheme();

  const handleChange = (event: SelectChangeEvent<typeof items>) => {
    // get the array from the event
    const {
      target: { value },
    } = event;
    // the array is passed to the add, so we always give a new array
    add(typeof value === 'string' ? value.split(',') : value);
  };
  return loading ? (
    <></>
  ) : (
    <Box sx={{ pl: '40%', pr: '40%' }}>
      <FormControl fullWidth>
        <InputLabel id="demo-multiple-chip-label">{title}</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={context}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value: any) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {items
            ?.filter((e: any) => e)
            .map((name: any) => (
              <MenuItem
                key={name}
                value={name}
                style={getStyles(name, context, theme)}
              >
                {name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default MultipleSelectChip;
