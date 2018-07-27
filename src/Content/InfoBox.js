/* @flow */
import React, { Component } from "react";

/**
 * Higher order component for content area infobox
 * @param title
 * @param className
 * @param children
 * @returns {XML}
 * @constructor
 */
export const InfoBox = ({
  title,
  className,
  children
}: {
  title?: string,
  className?: string,
  children: Component
}) => {
  var boxHeader;
  if (title) {
    boxHeader = (
      <div className="box-header with-border">
        <h3 className="box-title">{title}</h3>
      </div>
    );
  }

  return (
    <div
      className={"box box-default noselect " + className}
      style={{ height: "100%" }}
    >
      {boxHeader}
      <div className="box-body">{children}</div>
    </div>
  );
};
