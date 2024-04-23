import LottieView from "lottie-react-native";
import React, { Component } from "react";
import { View, StyleSheet, Modal } from "react-native";
import Images from "../../constants/Images";
import { SQUARE, WIDTH } from "../../constants/Utils";

export default class ProgressDialog extends Component {
  state = {
    visible: false,
  };

  static dialogInstance;
  static show(config) {
    this.dialogInstance.showDialog(config);
  }

  static hide() {
    this.dialogInstance.hideDialog();
  }
  showDialog(config) {
    this.setState({
      visible: true,
    });
  }
  hideDialog = () => {
    this.setState({
      visible: false,
    });
  };
  componentDidMount() {
    if (this.props.onRef != null) {
      this.props.onRef(this);
    }
  }

  render() {
    return (
      <Modal visible={this.state.visible} transparent>
        <View style={styles.styleDialogContent} >
          <View style={styles.activityIndicatorWrapper}>
            {/* <ActivityIndicator size={'large'} color={'black'} /> */}
            <LottieView source={Images.Loader} autoPlay loop style={[SQUARE(WIDTH * 0.27)]} />
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  styleDialogContent: {
    backgroundColor: "#0000009c",
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
  activityIndicatorWrapper: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 100
  },
});
