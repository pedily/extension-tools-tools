import {
	INodeField,
	INodeSection,
	INodeDescriptor,
	INodeFieldAndSectionFormElement,
} from "@cognigy/extension-tools/build/interfaces/descriptor";

export interface NodeSectionWithNestedFields
	extends Omit<INodeSection, "fields"> {
	fields: INodeField[];
}

export type NodeFieldOrNestedSection = INodeField | NodeSectionWithNestedFields;

const isField = (
	fieldOrSection: NodeFieldOrNestedSection
): fieldOrSection is INodeField => {
	if (!fieldOrSection) return false;

	if ((fieldOrSection as NodeSectionWithNestedFields).fields) {
		return false;
	}

	return true;
};

const toRegularSection = (
	nestedSection: NodeSectionWithNestedFields
): INodeSection => {
	const fields = nestedSection.fields.map((field) => field.key);

	return {
		...nestedSection,
		fields,
	};
};

const getFormEntry = (
	type: "field" | "section",
	key: string
): INodeFieldAndSectionFormElement => ({
	type,
	key,
});

export const createNodeForm = (
	entries: NodeFieldOrNestedSection[]
): Pick<INodeDescriptor, "fields" | "sections" | "form"> => {
	const fields: INodeField[] = [];
	const sections: INodeSection[] = [];
	const form: INodeFieldAndSectionFormElement[] = [];

	for (const fieldOrNestedSection of entries) {
		if (isField(fieldOrNestedSection)) {
			fields.push(fieldOrNestedSection);
			form.push(getFormEntry("field", fieldOrNestedSection.key));
		} else {
			fields.push(...fieldOrNestedSection.fields);
			sections.push(toRegularSection(fieldOrNestedSection));
			form.push(getFormEntry("section", fieldOrNestedSection.key));
		}
	}

	return {
		fields,
		sections,
		form,
	};
};
