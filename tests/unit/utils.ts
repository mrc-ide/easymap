export const waitForOnMount = async (waitFor = 200) => {
    // Unfortunately, onMount is not called synchronously with testing-library's render
    // so we need to give it a little time to happen
    await new Promise((resolve) => setTimeout(resolve, waitFor));
};
