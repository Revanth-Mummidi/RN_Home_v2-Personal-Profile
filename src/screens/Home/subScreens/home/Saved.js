import { View, Text,TouchableOpacity,FlatList } from 'react-native'
import React from 'react'
import { getColor } from '../../../../themes/GetColor'
import { useSelector } from 'react-redux'
import { responsiveHeight, responsiveWidth } from '../../../../themes/ResponsiveDimensions'
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native'

const Saved = () => {
    const navigation = useNavigation();
    const Color = getColor(useSelector(state => state.theme.theme));
    const datas = [
        {id:'1',name:'Hospitals',datalength:5},
        {id:'2',name:'Tracker',datalength:5},
        {id:'3',name:'Explore',datalength:5},
        {id:'1',name:'Hospitals',datalength:5},
        {id:'2',name:'Tracker',datalength:5},
        {id:'3',name:'Explore',datalength:5}
    ]

    const data = [
        {
          id: 1,
          name: 'Folder 1',
          files: ['File 1', 'File 2', 'File 3'],
          subfolders: [
            {
              id: 11,
              name: 'Subfolder 1.1',
              files: ['Subfile 1', 'Subfile 2'],
              subfolders: [],
            },
          ],
        },
        {
          id: 2,
          name: 'Folder 2',
          files: ['File 4', 'File 5'],
          subfolders: [],
        },
        {
          id: 3,
          name: 'Folder 3',
          files: ['File 6', 'File 7', 'File 8'],
          subfolders: [
            {
              id: 31,
              name: 'Subfolder 3.1',
              files: ['Subfile 3', 'Subfile 4'],
              subfolders: [
                {
                  id: 311,
                  name: 'Subfolder 3.1.1',
                  files: ['Subfile 5'],
                  subfolders: [],
                },
              ],
            },
          ],
        },
        {
          id: 4,
          name: 'Folder 4',
          files: ['File 9', 'File 10'],
          subfolders: [],
        },
      ]

    const handleFolderPress = (folder) => {
        navigation.push('FolderDetails', { folder });
      };
    
      const renderFolder = ({ item }) => (
        <Folder folder={item} onPress={() => handleFolderPress(item)} />
      );


  return (
    <View style={{backgroundColor:Color.color1}}>
        <View style={{flexDirection:'row',flexWrap:'wrap'}}>
                <FlatList
                data={data}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderFolder}
            />
        {/* {
            data.map((data,index)=>{
            return(
                    <View key={index} style={{alignItems:'center'}}>
                       
                        <IconMaterialCommunityIcons
                            name="folder"
                            size={70}
                            color= '#DFDFDF'
                            style={{height:responsiveHeight(10),width:responsiveWidth(20),marginRight:responsiveWidth(5),marginLeft:responsiveWidth(5),marginTop:responsiveWidth(5)}}
                        />
                       
                        <Text style={{color:Color.WHITE}}>{data.name}</Text>
                    </View>
            );
              }
            )
        } */}
       </View>
    </View>
  )
}

// const FolderDetails = ({ route }) => {
//     const { folder } = route.params;
  
//     return (
//       <View>
//         <Text>{`Folder Details: ${folder.name}`}</Text>
//       </View>
//     );
//   };

const Folder = ({ folder, onPress }) => {
    return (
      <TouchableOpacity onPress={onPress}>
        
        <IconMaterialCommunityIcons
                            name="folder"
                            size={70}
                            color= '#DFDFDF'
                            style={{height:responsiveHeight(10),width:responsiveWidth(20),marginRight:responsiveWidth(5),marginLeft:responsiveWidth(5),marginTop:responsiveWidth(5)}}
        />
          <Text>{folder.name}</Text>
          <Text>{`${folder.files.length} files`}</Text>
      
      </TouchableOpacity>
    );
  };

export default Saved