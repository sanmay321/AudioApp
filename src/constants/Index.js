import {Platform, ToastAndroid, PermissionsAndroid, Alert} from 'react-native';
import urls from '../redux/lib/urls';
import Api from '../redux/lib/api';

const _permissions = async () => {
  if (Platform.OS == 'ios') {
    return true;
  }
  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.CAMERA,
    {
      title: 'Camera Permission',
      message: 'This app needs access to your camera.',
      buttonPositive: 'OK',
      buttonNegative: 'Cancel',
    },
  );
  console.log('=== grandted ==== ', granted);
};

function _toast(string) {
  if (typeof string == 'string') {
    if (Platform.OS == 'ios') {
      Alert.alert(string);
    } else {
      ToastAndroid.showWithGravity(
        string,
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
      );
    }
  }
}

function isImage(url) {
  return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
}
function checkActualPackagesCom(packages) {
  if (!Array.isArray(packages)) {
    return false;
  }
  let totalProcessed = 0;
  let totalRemaining = 0;
  let totalActualCount = 0;

  packages.forEach(pkg => {
    totalActualCount += pkg.actual_component_count; // Sum up actual components

    pkg.components.forEach(component => {
      if (component.rfid_processed === 1 || component.barcode_processed === 1) {
        totalProcessed += 1;
      } else {
        totalRemaining += 1;
      }
    });
  });
  return {
    allProcessed: totalRemaining === 0,
    totalProcessed,
    totalRemaining,
    totalActualCount,
  };
}

async function _Is_Operation_Completed(move_id, setLoading) {
  try {
    setLoading(true);
    const res = await Api.get(`${urls.GET_ITEMS_BY_OPERATION}?operation_id=${move_id}`);
    setLoading(false);

    if (res && res.status) {
      return isComplete(res.data?.items);
    } else {
      _toast(res.message || 'An error occurred');
      return false;
    }
  } catch (error) {
    console.error('Error in checkOperationCompletion:', error);
    setLoading(false);
    _toast('Failed to fetch operation status');
    return false;
  }
}
const isComplete = data => {
  const totalComp = data?.reduce((a, b) => a + (b?.total_components || 0), 0);
  const processedComp = data?.reduce((a, b) => a + (b?.processed_components || 0), 0);

  console.log('Component Check:', { totalComp, processedComp });
  return processedComp === totalComp;
};
module.exports = {
  _toast: _toast,
  isImage: isImage,
  _permissions: _permissions,
  checkActualPackagesCom: checkActualPackagesCom,
  _Is_Operation_Completed: _Is_Operation_Completed,
  isComplete:isComplete
};
