const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");

test("mobile marquee starts on Safari-style MediaQueryList", () => {
  const frames = [];
  const mediaQueries = [];
  let actualScrollLeft = 0;
  const marquee = {
    get scrollLeft() { return actualScrollLeft; },
    set scrollLeft(value) { actualScrollLeft = Math.floor(value); },
    addEventListener() {}
  };
  const firstClone = { offsetLeft: 1200 };
  const track = {
    querySelector() {
      return firstClone;
    }
  };

  const context = vm.createContext({
    console,
    fetch: () => new Promise(() => {}),
    setTimeout,
    clearTimeout,
    document: {
      visibilityState: "visible",
      querySelector(selector) {
        if (selector === ".photo-marquee") return marquee;
        if (selector === "[data-photo-track]") return track;
        return null;
      },
      addEventListener() {}
    },
    window: {
      matchMedia(query) {
        const result = {
          media: query,
          matches: !query.includes("reduced-motion"),
          addListener() {}
        };
        mediaQueries.push(result);
        return result;
      },
      requestAnimationFrame(callback) {
        frames.push(callback);
        return frames.length;
      },
      cancelAnimationFrame() {},
      setTimeout,
      clearTimeout
    }
  });

  const script = fs.readFileSync(path.join(__dirname, "..", "script.js"), "utf8");
  vm.runInContext(script, context);

  assert.doesNotThrow(() => context.setupMobilePhotoMarquee());
  assert.ok(frames.length > 0, "automatic scrolling should schedule an animation frame");

  frames.shift()(1000);
  frames.shift()(1020);
  frames.shift()(1040);
  frames.shift()(1060);
  assert.ok(marquee.scrollLeft > 0, "automatic scrolling should advance the photo strip");
  assert.equal(typeof mediaQueries[0].addListener, "function");
});
