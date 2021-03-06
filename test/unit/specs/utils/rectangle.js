/* globals describe, it, spyOn, require, beforeEach, expect, jasmine */

describe('Rectangle ===', function() {
  'use strict';

  var XJS = require('xjs');
  var Rectangle = XJS.Rectangle;

  describe('can be instantiated', function() {
    it('from width and height', function() {
      var dimRectangle = Rectangle.fromDimensions(randomInt(), randomInt());
      expect(dimRectangle).toBeInstanceOf(Rectangle);
      expect(function() {
        Rectangle.fromDimensions(-randomInt(1), randomInt());
      }).toThrow();
      expect(function() {
        Rectangle.fromDimensions(randomInt(), -randomInt(1));
      }).toThrow();
      expect(function() {
        Rectangle.fromDimensions(-randomInt(1), -randomInt(1));
      }).toThrow();
    });

    it('from an object of rectangular coordinates', function() {
      var firstSmallerInt = randomInt(0,50);
      var secondSmallerInt = randomInt(0,50);
      var firstBiggerInt = randomInt(51,100);
      var secondBiggerInt = randomInt(51,100);
      var coordRectangle = Rectangle.fromCoordinates(firstSmallerInt, secondSmallerInt, firstBiggerInt, secondBiggerInt);
      expect(coordRectangle).toBeInstanceOf(Rectangle);
      // throw error when right is smaller than left
      expect(function() {
        coordRectangle = Rectangle.fromCoordinates(firstBiggerInt, secondSmallerInt, firstSmallerInt, secondBiggerInt);
      }).toThrow();
      // throw error when bottom is smaller than top
      expect(function() {
        coordRectangle = Rectangle.fromCoordinates(firstSmallerInt, secondBiggerInt, firstBiggerInt, secondSmallerInt);
      }).toThrow();
      // throw error when both bottom is smaller than top and right is smaller than left
      expect(function() {
        coordRectangle = Rectangle.fromCoordinates(firstBiggerInt, secondBiggerInt, firstSmallerInt, secondSmallerInt);
      }).toThrow();
    });

    it('or as an empty object', function() {
      var emptyRectangle = new Rectangle();
      expect(emptyRectangle).toBeInstanceOf(Rectangle);
    });
  });
  
  describe('should be able to get and set', function() {
    var testRectangle;
    beforeEach(function() {
      var firstSmallerInt = randomInt(0,50);
      var secondSmallerInt = randomInt(0,50);
      var firstBiggerInt = randomInt(51,100);
      var secondBiggerInt = randomInt(51,100);
      testRectangle = Rectangle.fromCoordinates(firstSmallerInt, secondSmallerInt, firstBiggerInt, secondBiggerInt);      
    });

    it('left', function() {
      var testLeft = testRectangle.getLeft();
      var newLeft = testLeft;
      while (newLeft === testLeft) {
        newLeft = randomInt(0,50);
      }
      testRectangle.setLeft(newLeft);
      var leftValue = testRectangle.getLeft();
      expect(leftValue).toBeTypeOf('number');
      expect(leftValue).not.toEqual(testLeft);
      expect(leftValue).toEqual(newLeft);
    });

    it('top', function() {
      var testTop = testRectangle.getTop();
      var newTop = testTop;
      while (newTop === testTop) {
        newTop = randomInt(0,50);
      }
      testRectangle.setTop(newTop);
      var topValue = testRectangle.getTop();
      expect(topValue).toBeTypeOf('number');
      expect(topValue).not.toEqual(testTop);
      expect(topValue).toEqual(newTop);
    });

    it('right', function() {
      var testRight = testRectangle.getRight();
      var newRight = testRight;
      while (newRight === testRight) {
        newRight = randomInt(51,100);
      }
      testRectangle.setRight(newRight);
      var rightValue = testRectangle.getRight();
      expect(rightValue).toBeTypeOf('number');
      expect(rightValue).not.toEqual(testRight);
      expect(rightValue).toEqual(newRight);
    });

    it('bottom', function() {
      var testBottom = testRectangle.getBottom();
      var newBottom = testBottom;
      while (newBottom === testBottom) {
        newBottom = randomInt(51,100);
      }
      testRectangle.setBottom(newBottom);
      var bottomValue = testRectangle.getBottom();
      expect(bottomValue).toBeTypeOf('number');
      expect(bottomValue).not.toEqual(testBottom);
      expect(bottomValue).toEqual(newBottom);
    });

    it('width', function() {
      var testWidth = testRectangle.getWidth();
      var newWidth = testWidth;
      while (newWidth === testWidth) {
        newWidth = randomInt(51,100);
      }
      testRectangle.setWidth(newWidth);
      var widthValue = testRectangle.getWidth();
      expect(widthValue).toBeTypeOf('number');
      expect(widthValue).not.toEqual(testWidth);
      expect(widthValue).toEqual(newWidth);
    });

    it('height', function() {
      var testHeight = testRectangle.getHeight();
      var newHeight = testHeight;
      while (newHeight === testHeight) {
        newHeight = randomInt(51,100);
      }
      testRectangle.setHeight(newHeight);
      var heightValue = testRectangle.getHeight();
      expect(heightValue).toBeTypeOf('number');
      expect(heightValue).not.toEqual(testHeight);
      expect(heightValue).toEqual(newHeight);      
    });

    it('left or right with width being automatically adjusted', function() {
      var testLeft = testRectangle.getLeft();
      var testWidth = testRectangle.getWidth();
      var newLeft = testLeft;
      while (newLeft === testLeft) {
        newLeft = randomInt(0,50);
      }
      testRectangle.setLeft(newLeft);
      expect(testRectangle.getWidth()).not.toEqual(testWidth);
      testWidth = testRectangle.getWidth();
      var testRight = testRectangle.getRight();
      var newRight = testRight;
      while (newRight === testRight) {
        newRight = randomInt(51,100);
      }
      testRectangle.setRight(newRight);
      expect(testRectangle.getWidth()).not.toEqual(testWidth);
    });

    it('top or bottom with height being automatically adjusted', function() {
      var testTop = testRectangle.getTop();
      var testHeight = testRectangle.getHeight();
      var newTop = testTop;
      while (newTop === testTop) {
        newTop = randomInt(0,50);
      }
      testRectangle.setTop(newTop);
      expect(testRectangle.getHeight()).not.toEqual(testHeight);
      testHeight = testRectangle.getHeight();
      var testBottom = testRectangle.getBottom();
      var newBottom = testBottom;
      while (newBottom === testBottom) {
        newBottom = randomInt(51,100);
      }
      testRectangle.setBottom(newBottom);
      expect(testRectangle.getHeight()).not.toEqual(testHeight);      
    });
  });

  describe('should be convertible to string', function() {
    it('based on its dimensions', function() {
      var testRectangle = Rectangle.fromDimensions(randomInt(), randomInt());
      expect(testRectangle.toDimensionString()).toBeTypeOf('string');
    });

    it('based on its coordinates', function() {
      var firstSmallerInt = randomInt(0,50);
      var secondSmallerInt = randomInt(0,50);
      var firstBiggerInt = randomInt(51,100);
      var secondBiggerInt = randomInt(51,100);
      var testRectangle = Rectangle.fromCoordinates(firstSmallerInt, secondSmallerInt, firstBiggerInt, secondBiggerInt);
      expect(testRectangle.toCoordinateString()).toBeTypeOf('string');
      expect(function() {
        var rectangleString = Rectangle.fromDimensions(randomInt(), randomInt()).toCoordinateString();
      }).toThrow();
      testRectangle = new Rectangle();
      expect(function() {
        var rectangleString = testRectangle.toCoordinateString();
      }).toThrow();
      testRectangle.setLeft(firstSmallerInt);
      expect(function() {
        var rectangleString = testRectangle.toCoordinateString();
      }).toThrow();
      testRectangle.setTop(secondSmallerInt);
      expect(function() {
        var rectangleString = testRectangle.toCoordinateString();
      }).toThrow();
      testRectangle.setRight(firstBiggerInt);
      expect(function() {
        var rectangleString = testRectangle.toCoordinateString();
      }).toThrow();
      testRectangle.setBottom(firstBiggerInt);
      expect(testRectangle.toCoordinateString()).toBeTypeOf('string');
    });

    it('based on a custom format', function() {
      var leftValue = randomInt(0,50);
      var topValue = randomInt(0,50);
      var rightValue = randomInt(51,100);
      var bottomValue = randomInt(51,100);
      var widthValue = rightValue - leftValue;
      var heightValue = bottomValue - topValue;
      var formatRectangle = Rectangle.fromCoordinates(leftValue, topValue, rightValue, bottomValue);

      var expectedString = 'Left->'+ leftValue + ', Top->' + topValue + ', Right->' + rightValue + ', Bottom->' + bottomValue + ', Width->' + widthValue + ', Height->' + heightValue;
      var resultString = formatRectangle.toString('Left->:left, Top->:top, Right->:right, Bottom->:bottom, Width->:width, Height->:height');
      expect(formatRectangle.toString()).toEqual(formatRectangle.toDimensionString());
      expect(resultString).toEqual(expectedString);
    });
  });
});