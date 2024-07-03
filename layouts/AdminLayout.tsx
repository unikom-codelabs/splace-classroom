import React from "react";
import { Card, CardHeader, CardBody, Divider } from "@nextui-org/react";
import Layout from "./layout";

const AdminLayout = ({
  header,
  title,
  subtitle,
  children,
  footer,
}: {
  header?: React.ReactNode;
  children: React.ReactNode;
  title: string;
  subtitle: string;
  footer?: React.ReactNode;
}) => {
  return (
    <Layout>
      <section className="py-5 my-5">
        <div
          className={`container mx-auto w-screen md:w-full max-w-7xl px-4  ${
            header ? "" : "mt-10"
          }`}
        >
          {header}
          <Card className="p-2 w-full">
            <CardHeader className="flex gap-3">
              <div className="flex flex-col">
                <p className="text-2xl font-bold">{title || "TItle"}</p>
                <p className="text-sm">{subtitle || "subTitle"}</p>
              </div>
            </CardHeader>
            <Divider />
            <CardBody className="h-[75vh]">{children}</CardBody>
          </Card>
        </div>
      </section>
      {footer}
    </Layout>
  );
};

export default AdminLayout;
