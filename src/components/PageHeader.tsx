import {
    Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator
} from '@/components/ui/breadcrumb';

function PageHeader({
  title,
  desc,
  pageTitle,
  breadcrumb = true,
}: {
  title: string;
  desc?: string;
  pageTitle?: string;
  breadcrumb?: boolean;
}) {
  return (
    <div className="flex flex-col space-y-1">
      {/* <h6 className="font-medium text-gray-300 ">{pageTitle}</h6> */}
      {breadcrumb && (
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">{pageTitle}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/components">{title}</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      )}

      <h1 className="text-4xl font-semibold">{title}</h1>
      {desc && <p className="text-lg font-light">{desc}</p>}
    </div>
  );
}

export default PageHeader;
