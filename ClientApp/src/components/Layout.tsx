import React from 'react';

export const Layout = (props: any) => {
  return <div className="h-screen w-screen bg-slate-200">{props.children}</div>;
}
