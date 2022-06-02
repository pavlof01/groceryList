import React, {useState} from 'react';
import {
  Box,
  Divider,
  FormControl,
  Input,
  ScrollView,
  Slider,
  Stack,
  Button,
} from 'native-base';

import {useDispatch} from '../store';
import {listAddOne} from '../store/List';
import {useNavigation} from '@react-navigation/native';

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [title, setTitle] = useState<string>('');
  const [priority, setPriority] = useState(3);

  const handleCreate = async () => {
    try {
      dispatch(
        listAddOne({
          id: new Date().valueOf().toString(),
          title,
          priority,
          isDone: false,
        }),
      );
      navigation.goBack();
    } catch (error) {}
  };

  return (
    <ScrollView w="100%">
      <Stack space={2.5} px="4">
        <Box>
          <FormControl mb="5">
            <FormControl.Label>Title</FormControl.Label>
            <Input value={title} onChangeText={setTitle} />
            <FormControl.HelperText>
              Give your list item a title.
            </FormControl.HelperText>
          </FormControl>
          <Divider />
        </Box>
        <Box>
          <FormControl mb="5">
            <FormControl.Label>Priority {priority}</FormControl.Label>
            <Slider
              defaultValue={priority}
              minValue={1}
              maxValue={5}
              accessibilityLabel="Set rating"
              step={1}
              onChange={setPriority}>
              <Slider.Track>
                <Slider.FilledTrack />
              </Slider.Track>
              <Slider.Thumb />
            </Slider>
            <FormControl.HelperText>
              1 is highest priority, 5 is the lowest
            </FormControl.HelperText>
          </FormControl>
          <Divider />
        </Box>
        <Button onPress={handleCreate}>Create</Button>
      </Stack>
    </ScrollView>
  );
};

export default AddProduct;
