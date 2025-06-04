import {ActivityIndicator, Modal, View} from 'react-native';
import React from 'react';
import {globalStyles} from '../theme/globalStyles';
import {colors} from '../theme/colors';

const Loader = ({visible}: {visible: boolean}) => {
  return (
    <Modal visible={visible} transparent>
      <View style={globalStyles.container}>
        <ActivityIndicator size={'large'} color={colors.primary} />
      </View>
    </Modal>
  );
};

export default Loader;
