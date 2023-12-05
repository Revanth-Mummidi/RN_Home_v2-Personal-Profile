import { View, Text,FlatList } from 'react-native'
import React from 'react'
import { responsiveWidth } from '../../../../themes/ResponsiveDimensions';



const FolderDetails = ({ route }) => {
  const { folder } = route.params;

  return (
    <View style={{margin:responsiveWidth(15)}}>
      <Text>{`Folder Details: ${folder.name}`}</Text>
      <Text>{`Files: ${folder.files.join(', ')}`}</Text>
      
      {folder.subfolders.length > 0 && (
        <View>
          <Text>Subfolders:</Text>
          <FlatList
            data={folder.subfolders}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View>
                <Text>{`- ${item.name}`}</Text>
                <Text>{`Files: ${item.files.join(', ')}`}</Text>
                {/* Recursive rendering for nested subfolders */}
                {item.subfolders.length > 0 && (
                  <FlatList
                    data={item.subfolders}
                    keyExtractor={(subfolder) => subfolder.id.toString()}
                    renderItem={({ subfolder }) => (
                      <View>
                        {/* <Text>{`-- ${subfolder.name}`}</Text> */}
                        {/* <Text>{`Files: ${subfolder.files.join(', ')}`}</Text> */}
                        {/* Continue recursive rendering as needed */}
                      </View>
                    )}
                  />
                )}
              </View>
            )}
          />
        </View>
      )}
    </View>
  );
};



export default FolderDetails