import { createNodeForm } from ".";

test("creates a form with a single field", () => {
	const result = createNodeForm([
		{
			key: "test",
			label: "Test",
			type: "cognigyText",
		},
	]);

	const expectedResult: ReturnType<typeof createNodeForm> = {
		fields: [
			{
				key: "test",
				label: "Test",
				type: "cognigyText",
			},
		],
		sections: [],
		form: [
			{
				type: "field",
				key: "test",
			},
		],
	};

	expect(result).toEqual(expectedResult);
});

test("creates a form with a nested section", () => {
	const result = createNodeForm([
		{
			label: "Section Key",
			key: "sectionKey",
			defaultCollapsed: false,
			fields: [
				{
					key: "fieldKey",
					label: "Field Label",
					type: "cognigyText",
				},
			],
		},
	]);

	const expectedResult: ReturnType<typeof createNodeForm> = {
		fields: [
			{
				key: "fieldKey",
				label: "Field Label",
				type: "cognigyText",
			},
		],
		sections: [
			{
				label: "Section Key",
				key: "sectionKey",
				defaultCollapsed: false,
				fields: ["fieldKey"],
			},
		],
		form: [{ type: "section", key: "sectionKey" }],
	};
});
