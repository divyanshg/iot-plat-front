import { useState } from 'react';
import GridLayout from 'react-grid-layout';
import { Link, useParams } from 'react-router-dom';

import { deviceColumns } from '@/columns';
import AddWidgetDrawer from '@/components/AddWidgetDrawer';
import DataTable from '@/components/DataTable';
import Loader from '@/components/Loader';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Widget from '@/components/widgets';
import useDashboard, { Layout } from '@/hooks/useDashboard';
import { useSubGroup } from '@/hooks/useGroups';

import PageHeader from '../../components/PageHeader';
import { SocketProvider } from '../../context/Dashboard';

function SubGroup() {
  const { sub_grp_id } = useParams();
  const { data, isLoading, isError } = useSubGroup(sub_grp_id!);
  const { layout, widgets, setLayout } = useDashboard();
  const [isEditing, setIsEditing] = useState(false);

  if (isLoading) return <Loader />;

  if (isError || !data || data.code == 404)
    return "There was an error while fetching the group. Please try again";

  function handleLayoutChange(layout: Layout) {
    setLayout(layout);
  }

  function handleEdit() {
    setIsEditing((previous) => !previous);
  }

  function saveLayout() {
    console.log(layout);
  }

  const grp = data.data;
  return (
    <SocketProvider>
      <div>
        <PageHeader
          title={grp.name}
          desc={grp.description}
          pageTitle="Subgroups"
        />
        <div className="mt-4">
          <Tabs defaultValue="dash" className="flex-1">
            <TabsList>
              <TabsTrigger value="dash">Dashboard</TabsTrigger>
              <TabsTrigger value="devices">Devices</TabsTrigger>
            </TabsList>
            <TabsContent value="dash">
              <div className="flex flex-row-reverse space-x-4">
                <Button onClick={saveLayout}>Save</Button>
                <Link to="properties">
                  <Button>Properties</Button>
                </Link>
                <AddWidgetDrawer />
                <Button onClick={handleEdit}>
                  {isEditing ? "Cancel" : "Edit"}
                </Button>
              </div>
              <GridLayout
                className="layout"
                layout={layout}
                isDraggable={isEditing}
                isResizable={isEditing}
                cols={12}
                rowHeight={30}
                width={1400}
                style={{
                  height: 800,
                }}
                onLayoutChange={handleLayoutChange as never}
              >
                {widgets.map((widget) => (
                  <div key={widget.id}>
                    <Widget {...widget} />
                  </div>
                ))}
              </GridLayout>
            </TabsContent>
            <TabsContent value="devices" className="flex flex-1">
              <DataTable
                data={grp.devices}
                columns={deviceColumns}
                searchPlaceholder="Search devices..."
                searchColumn="name"
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </SocketProvider>
  );
}

export default SubGroup;
