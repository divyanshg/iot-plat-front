import { Field, Form, Formik } from 'formik'; // Import Formik components
import { useState } from 'react';
import * as Yup from 'yup'; // Import Yup for validation

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle,
    SheetTrigger
} from '@/components/ui/sheet';

import useDashboard from '../hooks/useDashboard';
import { Select } from './Select';

const widgetTypes = [
  {
    value: "LINECHART",
    label: "Line Chart",
  },
  {
    value: "BARCHART",
    label: "Bar Chart",
  },
  {
    value: "AREACHART",
    label: "Area Chart",
  },
  {
    value: "DONUTCHART",
    label: "Donut Chart",
  },
  {
    value: "VIDEO",
    label: "Video",
  },
  {
    value: "TEXT",
    label: "Text",
  },
];

function getConfigurationForm(
  type: "LINECHART" | "BARCHART" | "AREACHART" | "VIDEO" | "DONUTCHART" | "TEXT"
) {
  if (
    type === "LINECHART" ||
    type === "BARCHART" ||
    type === "AREACHART" ||
    type === "DONUTCHART"
  ) {
    return (
      <>
        <div className="flex flex-col space-y-2">
          <Label htmlFor="topic" className="text-left">
            Data Topic
          </Label>
          <Field
            name="topic"
            as={Input}
            placeholder="tank1/waterLevel"
            className="col-span-3"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <Label htmlFor="category" className="text-left">
            Category
          </Label>
          <Field
            name="category"
            as={Input}
            placeholder="occupants"
            className="col-span-3"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <Label htmlFor="color" className="text-left">
            Color
          </Label>
          <Field
            name="color"
            as={Input}
            placeholder="red"
            className="col-span-3"
          />
        </div>
      </>
    );
  } else if (type === "VIDEO") {
    return (
      <>
        <div className="flex flex-col space-y-2">
          <Label htmlFor="url" className="text-left">
            URL
          </Label>
          <Field name="url" as={Input} placeholder="" className="col-span-3" />
        </div>
      </>
    );
  } else if (type === "TEXT") {
    return (
      <>
        <div className="flex flex-col space-y-2">
          <Label htmlFor="topic" className="text-left">
            Data Topic
          </Label>
          <Field
            name="topic"
            as={Input}
            placeholder="tank1/waterLevel"
            className="col-span-3"
          />
        </div>
      </>
    );
  }
}

export default function AddWidgetDrawer() {
  const [selectedType, setSelectedType] = useState(undefined);
  const { layout, widgets, setLayout, setWidgets } = useDashboard();

  const initialValues = {
    title: "",
    description: "",
    topic: "",
    category: "",
    color: "",
    url: "",
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    topic: Yup.string().required("Data Topic is required"),
    category: Yup.string(),
    color: Yup.string(),
    // url: Yup.string(),
  });

  function handleAddWidget(values: { title: string; description: string }) {
    setLayout([
      ...layout,
      {
        w: 4,
        h: 9,
        x: 0,
        y: 0,
        i: "rand_new",
        moved: false,
        static: false,
      },
    ]);
    setWidgets([
      ...widgets,
      {
        id: "rand_new",
        type: selectedType as never,
        title: values.title,
        description: values.description,
        data: [],
        config: {
          topic: "temperature",
          index: "time",
          categories: ["random"],
          colors: ["red"],
        },
      },
    ]);
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleAddWidget}
    >
      {({ isValid, dirty }) => (
        <Form>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">Add Widget</Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Add Widget</SheetTitle>
                <SheetDescription>
                  Widgets help you visualize your data
                </SheetDescription>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="title" className="text-left">
                    Widget Type
                  </Label>
                  <Select
                    value={selectedType}
                    onChange={setSelectedType as never}
                    data={widgetTypes}
                    placeHolder="Select type"
                    selectLabel="Type"
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="title" className="text-left">
                    Title
                  </Label>
                  <Field
                    name="title"
                    as={Input}
                    placeholder="Water Level"
                    className="col-span-3"
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="description" className="text-left">
                    Description
                  </Label>
                  <Field
                    name="description"
                    as={Input}
                    placeholder="Chart to visualize water level"
                    className="col-span-3"
                  />
                </div>
                {selectedType && (
                  <div className="flex flex-col space-y-4">
                    <h4 className="text-lg">Configuration</h4>
                    {getConfigurationForm(selectedType as never)}
                  </div>
                )}
              </div>
              <SheetFooter>
                <SheetClose asChild>
                  <Button type="submit" disabled={!isValid || !dirty}>
                    Add
                  </Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </Form>
      )}
    </Formik>
  );
}
