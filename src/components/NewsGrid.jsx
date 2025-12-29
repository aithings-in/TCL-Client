"use client";

import React from "react";
import NewsCard from "./NewsCard";

const NewsGrid = ({ items = [], showAll = false }) => {
  if (!items || items.length === 0) {
    return null;
  }

  // On desktop, show all items if showAll is true
  const mobileLimit = 5;
  const displayItems = showAll ? items : items.slice(0, mobileLimit);

  // Pattern: Row 1: [1,1,1,1], Row 2: [2,2], Row 3: [1,1,2], then repeat
  const rowPatterns = [
    [1, 1, 1, 1], // 4 single-width cards
    [2, 2], // 2 double-width cards
    [1, 1, 2],
  ];

  const rows = [];
  let itemIndex = 0;
  let patternIndex = 0;

  // Generate rows until we run out of items
  while (itemIndex < displayItems.length) {
    const currentPattern = rowPatterns[patternIndex % rowPatterns.length];
    const rowItems = [];
    let patternItemIndex = 0;

    // Fill the current row pattern
    while (
      patternItemIndex < currentPattern.length &&
      itemIndex < displayItems.length
    ) {
      rowItems.push({
        item: displayItems[itemIndex],
        span: currentPattern[patternItemIndex],
        index: itemIndex,
      });
      itemIndex++;
      patternItemIndex++;
    }

    if (rowItems.length > 0) {
      rows.push({
        pattern: currentPattern,
        items: rowItems,
        rowIndex: rows.length,
      });
    }

    patternIndex++;
  }

  return (
    <div className="space-y-4 md:space-y-6">
      {rows.map((row) => (
        <div
          key={row.rowIndex}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6"
        >
          {row.items.map(({ item, span, index }, colIndex) => {
            const spanClass =
              span === 2
                ? "lg:col-span-2"
                : span === 3
                ? "lg:col-span-3"
                : "lg:col-span-1";

            return (
              <div
                key={item.id ?? `${row.rowIndex}-${colIndex}`}
                className={`${spanClass} h-full`}
              >
                <NewsCard
                  news={item}
                  index={index}
                  variant={showAll ? "default" : "compact"}
                />
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default NewsGrid;
