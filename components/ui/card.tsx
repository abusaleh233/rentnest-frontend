import * as React from "react";

export const Card = ({ className = "", children }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-800 ${className}`}>
    {children}
  </div>
);

export const CardHeader = ({ className = "", children }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`p-5 border-b border-gray-100 dark:border-gray-700/50 ${className}`}>
    {children}
  </div>
);

export const CardTitle = ({ className = "", children }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3 className={`text-lg font-bold text-gray-900 dark:text-white ${className}`}>
    {children}
  </h3>
);

export const CardContent = ({ className = "", children }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`p-5 ${className}`}>{children}</div>
);

export const CardFooter = ({ className = "", children }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`p-5 border-t border-gray-100 dark:border-gray-700/50 ${className}`}>
    {children}
  </div>
);