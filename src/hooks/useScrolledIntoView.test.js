import { act, render } from '@testing-library/react';
import useScrolledIntoView from './useScrolledIntoView';

function TestComponent() {
  const [ref, inView] = useScrolledIntoView();
  return <div ref={ref}>{inView ? 'in-view' : 'not-in-view'}</div>;
}

function installMockIntersectionObserver() {
  let capturedCallback = null;
  const observe = jest.fn();
  const disconnect = jest.fn();

  window.IntersectionObserver = jest.fn((callback) => {
    capturedCallback = callback;
    return { observe, disconnect };
  });

  return {
    fireIntersection: (isIntersecting) => act(() => capturedCallback([{ isIntersecting }])),
    fireScroll: () => act(() => window.dispatchEvent(new Event('scroll'))),
    disconnect,
  };
}

test('does not flip to in-view from intersection alone, with no scroll yet', () => {
  const { fireIntersection } = installMockIntersectionObserver();
  const { getByText } = render(<TestComponent />);

  // Already intersecting right at mount (e.g. it sits high enough on the
  // page to be visible without scrolling) — should NOT count as in-view.
  fireIntersection(true);
  expect(getByText('not-in-view')).toBeInTheDocument();
});

test('does not flip to in-view from a scroll alone, before it intersects', () => {
  const { fireScroll } = installMockIntersectionObserver();
  const { getByText } = render(<TestComponent />);

  fireScroll();
  expect(getByText('not-in-view')).toBeInTheDocument();
});

test('flips to in-view once both a scroll happened and it is intersecting', () => {
  const { fireIntersection, fireScroll } = installMockIntersectionObserver();
  const { getByText } = render(<TestComponent />);

  fireIntersection(true); // already visible at mount, ignored on its own
  fireScroll(); // user actually scrolls — now both conditions are true
  expect(getByText('in-view')).toBeInTheDocument();
});

test('stays in-view for an element that never leaves the intersection threshold while scrolling', () => {
  // Regression check: an element that's intersecting at mount and stays
  // intersecting throughout (never crosses the threshold again) must
  // still reveal on the user's first scroll, not get stuck forever.
  const { fireIntersection, fireScroll } = installMockIntersectionObserver();
  const { getByText } = render(<TestComponent />);

  fireIntersection(true);
  fireScroll();
  fireScroll();
  expect(getByText('in-view')).toBeInTheDocument();
});

test('disconnects the observer and scroll listener once in-view is reached', () => {
  const { fireIntersection, fireScroll, disconnect } = installMockIntersectionObserver();
  const removeSpy = jest.spyOn(window, 'removeEventListener');
  render(<TestComponent />);

  fireIntersection(true);
  fireScroll();

  expect(disconnect).toHaveBeenCalled();
  expect(removeSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
  removeSpy.mockRestore();
});
