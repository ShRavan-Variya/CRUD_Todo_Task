import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';

export const checkPermission = async (item) => {
  let finalData;
  if (item === 'camera') {
    let response;
    if (Platform.OS === 'android') {
      response = await check(PERMISSIONS.ANDROID.CAMERA)
        .then(async result => {
          let data;
          console.log(JSON.stringify(result));
          switch (result) {
            case RESULTS.UNAVAILABLE:
              data = await permissionRequest(item);
              break;
            case RESULTS.DENIED:
              data = await permissionRequest(item);
              break;
            case RESULTS.GRANTED:
              data = {
                result: true,
                permission: 'GRANTED',
              };
              break;
            case RESULTS.BLOCKED:
              data = await permissionRequest(item);
              break;
          }
          return data;
        })
        .catch(async _error => {
          return await permissionRequest(item);
        });
    } else if (Platform.OS === 'ios') {
      response = await check(PERMISSIONS.IOS.CAMERA)
        .then(async result => {
          let data;
          switch (result) {
            case RESULTS.UNAVAILABLE:
              data = await permissionRequest(item);
              break;
            case RESULTS.DENIED:
              data = await permissionRequest(item);
              break;
            case RESULTS.GRANTED:
              data = {
                result: true,
                permission: 'GRANTED',
              };
              break;
            case RESULTS.BLOCKED:
              data = await permissionRequest(item);
              break;
          }
          return data;
        })
        .catch(async _error => {
          return await permissionRequest(item);
        });
    }
    finalData = response;
    return response;
  } else if (item === 'gallery') {
    let response;
    if (Platform.OS === 'android') {
      response = await check(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE)
        .then(async result => {
          let data;
          switch (result) {
            case RESULTS.UNAVAILABLE:
              data = await permissionRequest(item);
              break;
            case RESULTS.DENIED:
              data = await permissionRequest(item);
              break;
            case RESULTS.GRANTED:
              data = {
                result: true,
                permission: 'GRANTED',
              };
              break;
            case RESULTS.BLOCKED:
              data = await permissionRequest(item);
              break;
          }
          return data;
        })
        .catch(async _error => {
          return await permissionRequest(item);
        });
    } else if (Platform.OS === 'ios') {
      response = await check(PERMISSIONS.IOS.PHOTO_LIBRARY)
        .then(async result => {
          let data;
          switch (result) {
            case RESULTS.UNAVAILABLE:
              data = await permissionRequest(item);
              break;
            case RESULTS.LIMITED:
              data = await permissionRequest(item);
              break;
            case RESULTS.DENIED:
              data = await permissionRequest(item);
              break;
            case RESULTS.GRANTED:
              data = {
                result: true,
                permission: 'GRANTED',
              };
              break;
            case RESULTS.BLOCKED:
              data = await permissionRequest(item);
              break;
          }
          return data;
        })
        .catch(async _error => {
          return await permissionRequest(item);
        });
    }
    finalData = response;
    return response;
  }
  return finalData;
};
  
export const permissionRequest = async (item) => {
  let finalData;
  if (item === 'camera') {
    let response;
    if (Platform.OS === 'android') {
      response = await request(PERMISSIONS.ANDROID.CAMERA).then(result => {
        let data;
        console.log(JSON.stringify(result));
        switch (result) {
          case RESULTS.UNAVAILABLE:
            data = {
              result: false,
              permission: 'UNAVAILABLE',
            };
            break;
          case RESULTS.DENIED:
            data = {
              result: false,
              permission: 'DENIED',
            };
            break;
          case RESULTS.LIMITED:
            data = {
              result: false,
              permission: 'LIMITED',
            };
            break;
          case RESULTS.GRANTED:
            data = {
              result: true,
              permission: 'GRANTED',
            };
            break;
          case RESULTS.BLOCKED:
            data = {
              result: false,
              permission: 'BLOCKED',
            };
            break;
        }
        return data;
      });
    } else if (Platform.OS === 'ios') {
      response = await request(PERMISSIONS.IOS.CAMERA).then(result => {
        let data;
        switch (result) {
          case RESULTS.UNAVAILABLE:
            data = {
              result: false,
              permission: 'UNAVAILABLE',
            };
            break;
          case RESULTS.DENIED:
            data = {
              result: false,
              permission: 'DENIED',
            };
            break;
          case RESULTS.LIMITED:
            data = {
              result: false,
              permission: 'LIMITED',
            };
            break;
          case RESULTS.GRANTED:
            data = {
              result: true,
              permission: 'GRANTED',
            };
            break;
          case RESULTS.BLOCKED:
            data = {
              result: false,
              permission: 'BLOCKED',
            };
            break;
        }
        return data;
      });
    }
    finalData = response;
    return response;
  } else if (item === 'gallery') {
    let response;
    if (Platform.OS === 'android') {
      response = await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE).then(
        result => {
          let data;
          switch (result) {
            case RESULTS.UNAVAILABLE:
              data = {
                result: false,
                permission: 'UNAVAILABLE',
              };
              break;
            case RESULTS.DENIED:
              data = {
                result: false,
                permission: 'DENIED',
              };
              break;
            case RESULTS.LIMITED:
              data = {
                result: false,
                permission: 'LIMITED',
              };
              break;
            case RESULTS.GRANTED:
              data = {
                result: true,
                permission: 'GRANTED',
              };
              break;
            case RESULTS.BLOCKED:
              data = {
                result: false,
                permission: 'BLOCKED',
              };
              break;
          }
          return data;
        },
      );
    } else if (Platform.OS === 'ios') {
      response = await request(PERMISSIONS.IOS.PHOTO_LIBRARY).then(result => {
        let data;
        switch (result) {
          case RESULTS.UNAVAILABLE:
            data = {
              result: false,
              permission: 'UNAVAILABLE',
            };
            break;
          case RESULTS.DENIED:
            data = {
              result: false,
              permission: 'DENIED',
            };
            break;
          case RESULTS.LIMITED:
            data = {
              result: false,
              permission: 'LIMITED',
            };
            break;
          case RESULTS.GRANTED:
            data = {
              result: true,
              permission: 'GRANTED',
            };
            break;
          case RESULTS.BLOCKED:
            data = {
              result: false,
              permission: 'BLOCKED',
            };
            break;
        }
        return data;
      });
    }
    finalData = response;
    return response;
  }
  return finalData;
};