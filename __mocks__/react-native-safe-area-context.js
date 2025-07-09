class SafeAreaProvider {
    constructor(props) {
        return props.children;
    }
}

SafeAreaProvider.displayName = 'SafeAreaProvider';

class SafeAreaView {
    constructor(props) {
        return props.children;
    }
}

SafeAreaView.displayName = 'SafeAreaView';

export default {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets: () => ({top: 0, right: 0, bottom: 0, left: 0}),
  useSafeAreaFrame: () => ({x: 0, y: 0, width: 0, height: 0}),
};
