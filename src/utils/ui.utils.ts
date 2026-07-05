export const uiTransitionDelayMs = 300;

export function waitForUiTransition(delayMs = uiTransitionDelayMs) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, delayMs);
  });
}
