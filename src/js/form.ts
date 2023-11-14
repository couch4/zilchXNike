type FormField = {
  type: string;
  name?: string;
  label?: string;
};

function getFields(fields: FormField[]) {
  const fieldsArray = fields.map((val: FormField, i: number) => {
    const { type, name, label } = val;
    if (type === "checkbox") {
      return `
        <label class="zilch-checkbox">
          <input type="checkbox" name="${name}" />
          <span class="checkmark"></span>
          ${label}
        </label>
      `;
    } else {
      return `
        <input
          type="text"
          placeholder="${label}"
          name="${name}"
        />
      `;
    }
  });

  return fieldsArray.join(" ");
}

export function setupForm(element: HTMLFormElement, data: any) {
  element.innerHTML = `
    <div class="zilch-form">
      <h3 data-testid="create-your-account-title" class="sc-hKgILt erSjpu">
          ${data.title}
      </h3>
      ${getFields(data.form)}
      <div class="zilch-form-footer">
        <p class="zilch-terms">
          ${data.formTerms}
        </p>
        <button type="submit" id="signup-button" data-testid="signup-submit-button">
          ${data.formCTA}
        </button>
      </div>
    </div>
`;
}
