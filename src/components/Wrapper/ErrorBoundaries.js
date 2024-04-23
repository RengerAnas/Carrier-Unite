import { Text, View } from "react-native";
import React, { Component, ReactPropTypes } from "react";
import PrimaryBtn from "../Button/PrimaryBtn";
import { Styles } from "../../constants/Utils";

export class ErrorBoundaries extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    console.log(
      "🚀 ~ file: ErrorBoundaries.js:13 ~ ErrorBoundaries ~ getDerivedStateFromError ~ error:",
      error
    );
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log({ error, errorInfo });
    this.setState({ hasError: true });
    //  logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <View
          style={{
            flex: 1,
            padding: 10,
            justifyContent: "center",
          }}
        >
          <Text style={[Styles.normalFontStyle, { textAlign: "center", marginBottom: 10 }]}>
            Something went wrong! Please try again.
          </Text>
          <PrimaryBtn title={"Try Again"} onPress={() => this.setState({ hasError: false })} />
        </View>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundaries;
