/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import View from 'src/components/View';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { ScrollView, Dimensions } from 'react-native';

const CardSkeletonUi = () => {
   return (
      <ScrollView scrollEnabled={false}>
         <SkeletonPlaceholder>
            <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
               <View>
                  <View
                     style={{
                        width: 150,
                        height: 30,
                        borderRadius: 4,
                        marginTop: 6,
                     }}
                  />
                  <View
                     style={{
                        width: Dimensions.get('window').width - 20,
                        height: 100,
                        borderRadius: 4,
                        marginTop: 6,
                     }}
                  />
                  <View
                     style={{
                        width: 150,
                        height: 30,
                        borderRadius: 4,
                        marginTop: 6,
                     }}
                  />
                  <View
                     style={{
                        width: Dimensions.get('window').width - 20,
                        height: 100,
                        borderRadius: 4,
                        marginTop: 6,
                     }}
                  />
                  <View
                     style={{
                        width: 150,
                        height: 30,
                        borderRadius: 4,
                        marginTop: 6,
                     }}
                  />
                  <View
                     style={{
                        width: Dimensions.get('window').width - 20,
                        height: 100,
                        borderRadius: 4,
                        marginTop: 6,
                     }}
                  />
                  <View
                     style={{
                        width: 150,
                        height: 30,
                        borderRadius: 4,
                        marginTop: 6,
                     }}
                  />
                  <View
                     style={{
                        width: Dimensions.get('window').width - 20,
                        height: 100,
                        borderRadius: 4,
                        marginTop: 6,
                     }}
                  />
                  <View
                     style={{
                        width: 150,
                        height: 30,
                        borderRadius: 4,
                        marginTop: 6,
                     }}
                  />
                  <View
                     style={{
                        width: Dimensions.get('window').width - 20,
                        height: 100,
                        borderRadius: 4,
                        marginTop: 6,
                     }}
                  />
               </View>
            </View>
         </SkeletonPlaceholder>
      </ScrollView>
   );
};
export default CardSkeletonUi;
