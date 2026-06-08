<?php

use Twig\Environment;
use Twig\Error\LoaderError;
use Twig\Error\RuntimeError;
use Twig\Extension\CoreExtension;
use Twig\Extension\SandboxExtension;
use Twig\Markup;
use Twig\Sandbox\SecurityError;
use Twig\Sandbox\SecurityNotAllowedTagError;
use Twig\Sandbox\SecurityNotAllowedFilterError;
use Twig\Sandbox\SecurityNotAllowedFunctionError;
use Twig\Source;
use Twig\Template;
use Twig\TemplateWrapper;

/* components/itilobject/timeline/form_task_main_form.html.twig */
class __TwigTemplate_8dc795b35dea7232b229fdb95b2d6fe8 extends Template
{
    private Source $source;
    /**
     * @var array<string, Template>
     */
    private array $macros = [];

    public function __construct(Environment $env)
    {
        parent::__construct($env);

        $this->source = $this->getSourceContext();

        $this->parent = false;

        $this->blocks = [
        ];
    }

    protected function doDisplay(array $context, array $blocks = []): iterable
    {
        $macros = $this->macros;
        // line 32
        yield "
";
        // line 33
        $macros["fields"] = $this->macros["fields"] = $this->load("components/form/fields_macros.html.twig", 33)->unwrap();
        // line 34
        yield "
";
        // line 35
        $context["params"] = ((array_key_exists("params", $context)) ? (Twig\Extension\CoreExtension::default(($context["params"] ?? null), [])) : ([]));
        // line 36
        $context["candedit"] = ((array_key_exists("candedit", $context)) ? (Twig\Extension\CoreExtension::default(($context["candedit"] ?? null), CoreExtension::getAttribute($this->env, $this->source, ($context["item"] ?? null), "maySolve", [], "method", false, false, false, 36))) : (CoreExtension::getAttribute($this->env, $this->source, ($context["item"] ?? null), "maySolve", [], "method", false, false, false, 36)));
        // line 37
        $context["can_read_kb"] = ((array_key_exists("can_read_kb", $context)) ? (Twig\Extension\CoreExtension::default(($context["can_read_kb"] ?? null), (Session::haveRight("knowbase", Twig\Extension\CoreExtension::constant("READ")) || Session::haveRight("knowbase", Twig\Extension\CoreExtension::constant("KnowbaseItem::READFAQ"))))) : ((Session::haveRight("knowbase", Twig\Extension\CoreExtension::constant("READ")) || Session::haveRight("knowbase", Twig\Extension\CoreExtension::constant("KnowbaseItem::READFAQ")))));
        // line 40
        $context["can_update_kb"] = ((array_key_exists("can_update_kb", $context)) ? (Twig\Extension\CoreExtension::default(($context["can_update_kb"] ?? null), Session::haveRight("knowbase", Twig\Extension\CoreExtension::constant("UPDATE")))) : (Session::haveRight("knowbase", Twig\Extension\CoreExtension::constant("UPDATE"))));
        // line 41
        $context["nokb"] = ((array_key_exists("nokb", $context)) ? (Twig\Extension\CoreExtension::default(($context["nokb"] ?? null), (CoreExtension::getAttribute($this->env, $this->source, ($context["params"] ?? null), "nokb", [], "array", true, true, false, 41) || ((((CoreExtension::getAttribute($this->env, $this->source, ($context["params"] ?? null), "nokb", [], "array", true, true, false, 41) &&  !(null === (($_v0 = ($context["params"] ?? null)) && is_array($_v0) || $_v0 instanceof ArrayAccess ? ($_v0["nokb"] ?? null) : null)))) ? ((($_v1 = ($context["params"] ?? null)) && is_array($_v1) || $_v1 instanceof ArrayAccess ? ($_v1["nokb"] ?? null) : null)) : (false)) == true)))) : ((CoreExtension::getAttribute($this->env, $this->source, ($context["params"] ?? null), "nokb", [], "array", true, true, false, 41) || ((((CoreExtension::getAttribute($this->env, $this->source, ($context["params"] ?? null), "nokb", [], "array", true, true, false, 41) &&  !(null === (($_v2 = ($context["params"] ?? null)) && is_array($_v2) || $_v2 instanceof ArrayAccess ? ($_v2["nokb"] ?? null) : null)))) ? ((($_v3 = ($context["params"] ?? null)) && is_array($_v3) || $_v3 instanceof ArrayAccess ? ($_v3["nokb"] ?? null) : null)) : (false)) == true))));
        // line 42
        $context["rand"] = Html::sanitizeDomId(((array_key_exists("rand", $context)) ? (Twig\Extension\CoreExtension::default(($context["rand"] ?? null), Twig\Extension\CoreExtension::random($this->env->getCharset()))) : (Twig\Extension\CoreExtension::random($this->env->getCharset()))));
        // line 43
        $context["formoptions"] = ((array_key_exists("formoptions", $context)) ? (Twig\Extension\CoreExtension::default(($context["formoptions"] ?? null), (((CoreExtension::getAttribute($this->env, $this->source, ($context["params"] ?? null), "formoptions", [], "array", true, true, false, 43) &&  !(null === (($_v4 = ($context["params"] ?? null)) && is_array($_v4) || $_v4 instanceof ArrayAccess ? ($_v4["formoptions"] ?? null) : null)))) ? ((($_v5 = ($context["params"] ?? null)) && is_array($_v5) || $_v5 instanceof ArrayAccess ? ($_v5["formoptions"] ?? null) : null)) : ("")))) : ((((CoreExtension::getAttribute($this->env, $this->source, ($context["params"] ?? null), "formoptions", [], "array", true, true, false, 43) &&  !(null === (($_v6 = ($context["params"] ?? null)) && is_array($_v6) || $_v6 instanceof ArrayAccess ? ($_v6["formoptions"] ?? null) : null)))) ? ((($_v7 = ($context["params"] ?? null)) && is_array($_v7) || $_v7 instanceof ArrayAccess ? ($_v7["formoptions"] ?? null) : null)) : (""))));
        // line 44
        yield "
";
        // line 46
        $context["add_html_form"] = ( !array_key_exists("no_form", $context) || (($context["no_form"] ?? null) == false));
        // line 47
        yield "
<div class=\"itiltask\">
    ";
        // line 49
        if ((($tmp = ($context["add_html_form"] ?? null)) && $tmp instanceof Markup ? (string) $tmp : $tmp)) {
            // line 50
            yield "        <form
            name=\"asset_form\"
            style=\"width: 100%;\"
            class=\"d-flex flex-column\"
            method=\"post\"
            action=\"";
            // line 55
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(CoreExtension::getAttribute($this->env, $this->source, ($context["subitem"] ?? null), "getFormURL", [], "method", false, false, false, 55), "html", null, true);
            yield "\"
            enctype=\"multipart/form-data\"
            data-track-changes=\"true\"
            data-submit-once ";
            // line 58
            yield ($context["formoptions"] ?? null);
            yield "
        >
    ";
        }
        // line 61
        yield "
    <input type=\"hidden\" name=\"itemtype\" value=\"";
        // line 62
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(CoreExtension::getAttribute($this->env, $this->source, ($context["item"] ?? null), "getType", [], "method", false, false, false, 62), "html", null, true);
        yield "\" />
    <input type=\"hidden\" name=\"";
        // line 63
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(CoreExtension::getAttribute($this->env, $this->source, ($context["item"] ?? null), "getForeignKeyField", [], "method", false, false, false, 63), "html", null, true);
        yield "\" value=\"";
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape((($_v8 = CoreExtension::getAttribute($this->env, $this->source, ($context["item"] ?? null), "fields", [], "any", false, false, false, 63)) && is_array($_v8) || $_v8 instanceof ArrayAccess ? ($_v8["id"] ?? null) : null), "html", null, true);
        yield "\" />

    ";
        // line 65
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->extensions['Glpi\Application\View\Extension\PluginExtension']->callPluginHook(Twig\Extension\CoreExtension::constant("Glpi\\Plugin\\Hooks::PRE_ITEM_FORM"), ["item" => ($context["subitem"] ?? null), "options" => ($context["params"] ?? null)]), "html", null, true);
        yield "

    <div class=\"row mx-n3 mx-xxl-auto\">
        <div class=\"col-12 col-xl-7 col-xxl-8\">
            ";
        // line 69
        yield $macros["fields"]->getTemplateForMacro("macro_textareaField", $context, 69, $this->getSourceContext())->macro_textareaField(...["content", (($_v9 = CoreExtension::getAttribute($this->env, $this->source,         // line 71
($context["subitem"] ?? null), "fields", [], "any", false, false, false, 71)) && is_array($_v9) || $_v9 instanceof ArrayAccess ? ($_v9["content"] ?? null) : null), "", ["full_width" => true, "no_label" => true, "enable_richtext" => true, "enable_fileupload" => true, "mention_options" =>         // line 78
($context["mention_options"] ?? null), "entities_id" => (($_v10 = CoreExtension::getAttribute($this->env, $this->source,         // line 79
($context["item"] ?? null), "fields", [], "any", false, false, false, 79)) && is_array($_v10) || $_v10 instanceof ArrayAccess ? ($_v10["entities_id"] ?? null) : null), "rand" =>         // line 80
($context["rand"] ?? null), "editor_height" => 300, "aria_label" => _n("Task", "Tasks", 1)]]);
        // line 84
        yield "
        </div>
        <div class=\"col-12 col-xl-5 col-xxl-4 order-first order-md-last pe-0 pe-xxl-auto\">
            <div class=\"row\">
                ";
        // line 88
        $context["task_template_lbl"] = ('' === $tmp = \Twig\Extension\CoreExtension::captureOutput((function () use (&$context, $macros, $blocks) {
            // line 89
            yield "                    <i
                        class=\"";
            // line 90
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->extensions['Glpi\Application\View\Extension\ItemtypeExtension']->getItemtypeIcon("TaskTemplate"), "html", null, true);
            yield " me-1\"
                        title=\"";
            // line 91
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(_n("Task template", "Task templates", Session::getPluralNumber()), "html", null, true);
            yield "\"
                    ></i>
                ";
            yield from [];
        })())) ? '' : new Markup($tmp, $this->env->getCharset());
        // line 94
        yield "                ";
        yield $macros["fields"]->getTemplateForMacro("macro_dropdownField", $context, 94, $this->getSourceContext())->macro_dropdownField(...["TaskTemplate", "tasktemplates_id", (($_v11 = CoreExtension::getAttribute($this->env, $this->source,         // line 97
($context["subitem"] ?? null), "fields", [], "any", false, false, false, 97)) && is_array($_v11) || $_v11 instanceof ArrayAccess ? ($_v11["tasktemplates_id"] ?? null) : null),         // line 98
($context["task_template_lbl"] ?? null), ["full_width" => true, "icon_label" => true, "on_change" => (("itiltasktemplate_update" .         // line 102
($context["rand"] ?? null)) . "(this.value)"), "entity" => (($_v12 = CoreExtension::getAttribute($this->env, $this->source,         // line 103
($context["item"] ?? null), "fields", [], "any", false, false, false, 103)) && is_array($_v12) || $_v12 instanceof ArrayAccess ? ($_v12["entities_id"] ?? null) : null), "rand" =>         // line 104
($context["rand"] ?? null)]]);
        // line 106
        yield "

                ";
        // line 108
        $context["task_date_lbl"] = ('' === $tmp = \Twig\Extension\CoreExtension::captureOutput((function () use (&$context, $macros, $blocks) {
            // line 109
            yield "                    <i
                        class=\"ti ti-calendar me-1\"
                        title=\"";
            // line 111
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(_n("Date", "Dates", 1), "html", null, true);
            yield "\"
                    ></i>
                ";
            yield from [];
        })())) ? '' : new Markup($tmp, $this->env->getCharset());
        // line 114
        yield "                ";
        yield $macros["fields"]->getTemplateForMacro("macro_datetimeField", $context, 114, $this->getSourceContext())->macro_datetimeField(...["date", (($_v13 = CoreExtension::getAttribute($this->env, $this->source,         // line 116
($context["subitem"] ?? null), "fields", [], "any", false, false, false, 116)) && is_array($_v13) || $_v13 instanceof ArrayAccess ? ($_v13["date"] ?? null) : null),         // line 117
($context["task_date_lbl"] ?? null), ["full_width" => true, "icon_label" => true, "rand" =>         // line 121
($context["rand"] ?? null)]]);
        // line 123
        yield "

                ";
        // line 126
        yield "                ";
        $context["task_category_lbl"] = ('' === $tmp = \Twig\Extension\CoreExtension::captureOutput((function () use (&$context, $macros, $blocks) {
            // line 127
            yield "                    <i class=\"ti ti-tag me-1\" title=\"";
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(_n("Category", "Categories", 1), "html", null, true);
            yield "\"></i>
                ";
            yield from [];
        })())) ? '' : new Markup($tmp, $this->env->getCharset());
        // line 129
        yield "                ";
        yield $macros["fields"]->getTemplateForMacro("macro_dropdownField", $context, 129, $this->getSourceContext())->macro_dropdownField(...["TaskCategory", "taskcategories_id", (($_v14 = CoreExtension::getAttribute($this->env, $this->source,         // line 132
($context["subitem"] ?? null), "fields", [], "any", false, false, false, 132)) && is_array($_v14) || $_v14 instanceof ArrayAccess ? ($_v14["taskcategories_id"] ?? null) : null),         // line 133
($context["task_category_lbl"] ?? null), ["full_width" => true, "icon_label" => true, "entity" => (($_v15 = CoreExtension::getAttribute($this->env, $this->source,         // line 137
($context["item"] ?? null), "fields", [], "any", false, false, false, 137)) && is_array($_v15) || $_v15 instanceof ArrayAccess ? ($_v15["entities_id"] ?? null) : null), "condition" => ["is_active" => 1], "rand" =>         // line 141
($context["rand"] ?? null)]]);
        // line 143
        yield "

                ";
        // line 146
        yield "                ";
        $context["task_state_lbl"] = ('' === $tmp = \Twig\Extension\CoreExtension::captureOutput((function () use (&$context, $macros, $blocks) {
            // line 147
            yield "                    <i class=\"ti ti-list-check me-1\" title=\"";
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(__("Status"), "html", null, true);
            yield "\"></i>
                ";
            yield from [];
        })())) ? '' : new Markup($tmp, $this->env->getCharset());
        // line 149
        yield "
                ";
        // line 150
        $context["task_state"] = ('' === $tmp = \Twig\Extension\CoreExtension::captureOutput((function () use (&$context, $macros, $blocks) {
            // line 151
            yield "                    ";
            $this->extensions['Glpi\Application\View\Extension\PhpExtension']->call("Planning::dropdownState", ["state", (($_v16 = CoreExtension::getAttribute($this->env, $this->source, ($context["subitem"] ?? null), "fields", [], "any", false, false, false, 151)) && is_array($_v16) || $_v16 instanceof ArrayAccess ? ($_v16["state"] ?? null) : null), true, ["rand" => ($context["rand"] ?? null), "aria_label" => __("Status")]]);
            // line 152
            yield "                ";
            yield from [];
        })())) ? '' : new Markup($tmp, $this->env->getCharset());
        // line 153
        yield "
                ";
        // line 154
        yield $macros["fields"]->getTemplateForMacro("macro_htmlField", $context, 154, $this->getSourceContext())->macro_htmlField(...["state",         // line 156
($context["task_state"] ?? null),         // line 157
($context["task_state_lbl"] ?? null), ["full_width" => true, "icon_label" => true, "rand" =>         // line 161
($context["rand"] ?? null)]]);
        // line 163
        yield "

                ";
        // line 165
        $context["task_private_lbl"] = ('' === $tmp = \Twig\Extension\CoreExtension::captureOutput((function () use (&$context, $macros, $blocks) {
            // line 166
            yield "                    <i class=\"ti ti-eye-off me-1\" title=\"";
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(__("Private"), "html", null, true);
            yield "\"></i>
                ";
            yield from [];
        })())) ? '' : new Markup($tmp, $this->env->getCharset());
        // line 168
        yield "                ";
        yield $macros["fields"]->getTemplateForMacro("macro_sliderField", $context, 168, $this->getSourceContext())->macro_sliderField(...["is_private", (($_v17 = CoreExtension::getAttribute($this->env, $this->source,         // line 170
($context["subitem"] ?? null), "fields", [], "any", false, false, false, 170)) && is_array($_v17) || $_v17 instanceof ArrayAccess ? ($_v17["is_private"] ?? null) : null),         // line 171
($context["task_private_lbl"] ?? null), ["full_width" => true, "icon_label" => true, "rand" =>         // line 175
($context["rand"] ?? null), "additional_attributes" => ["onchange" => "toggleTimelinePrivate(this.checked, this)", "data-testid" => "private-switch"]]]);
        // line 181
        yield "

                ";
        // line 183
        if (((($context["candedit"] ?? null) && ($context["can_update_kb"] ?? null)) &&  !($context["nokb"] ?? null))) {
            // line 184
            yield "                ";
            $context["task_to_kb_lbl"] = ('' === $tmp = \Twig\Extension\CoreExtension::captureOutput((function () use (&$context, $macros, $blocks) {
                // line 185
                yield "                    <i
                        class=\"ti ti-device-floppy me-1\"
                        title=\"";
                // line 187
                yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(__("Save and add to the knowledge base"), "html", null, true);
                yield "\"
                        data-bs-toggle=\"tooltip\"
                        data-bs-placement=\"top\"
                    ></i>
                ";
                yield from [];
            })())) ? '' : new Markup($tmp, $this->env->getCharset());
            // line 192
            yield "                ";
            yield $macros["fields"]->getTemplateForMacro("macro_sliderField", $context, 192, $this->getSourceContext())->macro_sliderField(...["_task_to_kb", 0,             // line 195
($context["task_to_kb_lbl"] ?? null), ["full_width" => true, "icon_label" => true, "rand" =>             // line 199
($context["rand"] ?? null)]]);
            // line 201
            yield "
                ";
        }
        // line 203
        yield "
                ";
        // line 205
        yield "                ";
        $context["task_actiontime_lbl"] = ('' === $tmp = \Twig\Extension\CoreExtension::captureOutput((function () use (&$context, $macros, $blocks) {
            // line 206
            yield "                    <i class=\"ti ti-stopwatch me-1\" title=\"";
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(__("Duration"), "html", null, true);
            yield "\"></i>
                ";
            yield from [];
        })())) ? '' : new Markup($tmp, $this->env->getCharset());
        // line 208
        yield "
                ";
        // line 209
        if (((($_v18 = CoreExtension::getAttribute($this->env, $this->source, ($context["subitem"] ?? null), "fields", [], "any", false, false, false, 209)) && is_array($_v18) || $_v18 instanceof ArrayAccess ? ($_v18["actiontime"] ?? null) : null) <= 360000)) {
            // line 210
            yield "                    ";
            $context["duration_dropdown"] = $this->extensions['Glpi\Application\View\Extension\PhpExtension']->call("Dropdown::getDurationDropdown");
            // line 211
            yield "                    ";
            yield $macros["fields"]->getTemplateForMacro("macro_dropdownArrayField", $context, 211, $this->getSourceContext())->macro_dropdownArrayField(...["actiontime", (($_v19 = CoreExtension::getAttribute($this->env, $this->source, ($context["subitem"] ?? null), "fields", [], "any", false, false, false, 211)) && is_array($_v19) || $_v19 instanceof ArrayAccess ? ($_v19["actiontime"] ?? null) : null), ($context["duration_dropdown"] ?? null), ($context["task_actiontime_lbl"] ?? null), ["full_width" => true, "icon_label" => true, "rand" =>             // line 214
($context["rand"] ?? null), "display_emptychoice" => true, "aria_label" => __("Duration")]]);
            // line 217
            yield "
                ";
        } else {
            // line 219
            yield "                    ";
            yield $macros["fields"]->getTemplateForMacro("macro_htmlField", $context, 219, $this->getSourceContext())->macro_htmlField(...["", $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->extensions['Glpi\Application\View\Extension\DataHelpersExtension']->getFormattedDuration((($_v20 = CoreExtension::getAttribute($this->env, $this->source,             // line 221
($context["subitem"] ?? null), "fields", [], "any", false, false, false, 221)) && is_array($_v20) || $_v20 instanceof ArrayAccess ? ($_v20["actiontime"] ?? null) : null))),             // line 222
($context["task_actiontime_lbl"] ?? null), ["label_class" => "col-2", "input_class" => "col-10", "field_class" => "col-12"]]);
            // line 228
            yield "
                ";
        }
        // line 230
        yield "
                ";
        // line 232
        yield "                ";
        $context["task_user_lbl"] = ('' === $tmp = \Twig\Extension\CoreExtension::captureOutput((function () use (&$context, $macros, $blocks) {
            // line 233
            yield "                    <i class=\"ti ti-user me-1\" title=\"";
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->extensions['Glpi\Application\View\Extension\ItemtypeExtension']->getItemtypeName("User"), "html", null, true);
            yield "\"></i>
                ";
            yield from [];
        })())) ? '' : new Markup($tmp, $this->env->getCharset());
        // line 235
        yield "                ";
        yield $macros["fields"]->getTemplateForMacro("macro_dropdownField", $context, 235, $this->getSourceContext())->macro_dropdownField(...["User", "users_id_tech", ((CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source,         // line 238
($context["subitem"] ?? null), "fields", [], "any", false, true, false, 238), "users_id_tech", [], "array", true, true, false, 238)) ? (Twig\Extension\CoreExtension::default((($_v21 = CoreExtension::getAttribute($this->env, $this->source, ($context["subitem"] ?? null), "fields", [], "any", false, false, false, 238)) && is_array($_v21) || $_v21 instanceof ArrayAccess ? ($_v21["users_id_tech"] ?? null) : null), $this->extensions['Glpi\Application\View\Extension\SessionExtension']->session("glpiID"))) : ($this->extensions['Glpi\Application\View\Extension\SessionExtension']->session("glpiID"))),         // line 239
($context["task_user_lbl"] ?? null), ["full_width" => true, "icon_label" => true, "entity" => (($_v22 = CoreExtension::getAttribute($this->env, $this->source,         // line 243
($context["item"] ?? null), "fields", [], "any", false, false, false, 243)) && is_array($_v22) || $_v22 instanceof ArrayAccess ? ($_v22["entities_id"] ?? null) : null), "right" => "own_ticket", "rand" =>         // line 245
($context["rand"] ?? null)]]);
        // line 247
        yield "

                ";
        // line 250
        yield "                ";
        $context["task_group_lbl"] = ('' === $tmp = \Twig\Extension\CoreExtension::captureOutput((function () use (&$context, $macros, $blocks) {
            // line 251
            yield "                    <i class=\"ti ti-users me-1\" title=\"";
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->extensions['Glpi\Application\View\Extension\ItemtypeExtension']->getItemtypeName("Group"), "html", null, true);
            yield "\"></i>
                ";
            yield from [];
        })())) ? '' : new Markup($tmp, $this->env->getCharset());
        // line 253
        yield "                ";
        yield $macros["fields"]->getTemplateForMacro("macro_dropdownField", $context, 253, $this->getSourceContext())->macro_dropdownField(...["Group", "groups_id_tech", (($_v23 = CoreExtension::getAttribute($this->env, $this->source,         // line 256
($context["subitem"] ?? null), "fields", [], "any", false, false, false, 256)) && is_array($_v23) || $_v23 instanceof ArrayAccess ? ($_v23["groups_id_tech"] ?? null) : null),         // line 257
($context["task_group_lbl"] ?? null), ["full_width" => true, "icon_label" => true, "entity" => (($_v24 = CoreExtension::getAttribute($this->env, $this->source,         // line 261
($context["item"] ?? null), "fields", [], "any", false, false, false, 261)) && is_array($_v24) || $_v24 instanceof ArrayAccess ? ($_v24["entities_id"] ?? null) : null), "condition" => ["is_task" => 1], "rand" =>         // line 263
($context["rand"] ?? null)]]);
        // line 265
        yield "

                <script type=\"text/javascript\">
                    function showPlanUpdate";
        // line 268
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(($context["rand"] ?? null), "html", null, true);
        yield "(e) {
                        \$('#plan";
        // line 269
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(($context["rand"] ?? null), "html", null, true);
        yield "').hide();
                        \$('#dropdown_state";
        // line 270
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(($context["rand"] ?? null), "html", null, true);
        yield "').trigger('setValue', ";
        yield json_encode($this->extensions['Glpi\Application\View\Extension\SessionExtension']->session("glpiplanned_task_state"));
        yield ");
                        \$('#viewplan";
        // line 271
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(($context["rand"] ?? null), "html", null, true);
        yield "').load(`\${CFG_GLPI.root_doc}/ajax/planning.php`, {
                            action: \"add_event_classic_form\",
                            form: \"followups\", // Was followups for tasks before. Can't find where this is used.
                            entity: ";
        // line 274
        yield json_encode(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["item"] ?? null), "fields", [], "any", false, false, false, 274), "entities_id", [], "any", false, false, false, 274));
        yield ",
                            rand_user: ";
        // line 275
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(Twig\Extension\CoreExtension::random($this->env->getCharset()), "html", null, true);
        yield ",
                            rand_group: ";
        // line 276
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(Twig\Extension\CoreExtension::random($this->env->getCharset()), "html", null, true);
        yield ",
                            itemtype: \"";
        // line 277
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(CoreExtension::getAttribute($this->env, $this->source, ($context["subitem"] ?? null), "type", [], "any", false, false, false, 277), "js"), "html", null, true);
        yield "\",
                            items_id: ";
        // line 278
        yield json_encode(((CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["subitem"] ?? null), "fields", [], "any", false, true, false, 278), "id", [], "any", true, true, false, 278)) ? (Twig\Extension\CoreExtension::default(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["subitem"] ?? null), "fields", [], "any", false, false, false, 278), "id", [], "any", false, false, false, 278),  -1)) : ( -1)));
        yield ",
                            parent_itemtype: \"";
        // line 279
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(CoreExtension::getAttribute($this->env, $this->source, ($context["item"] ?? null), "getType", [], "method", false, false, false, 279), "js"), "html", null, true);
        yield "\",
                            parent_items_id: ";
        // line 280
        yield json_encode(((Twig\Extension\CoreExtension::testEmpty(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["item"] ?? null), "fields", [], "any", false, false, false, 280), "id", [], "any", false, false, false, 280))) ? (0) : (CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["item"] ?? null), "fields", [], "any", false, false, false, 280), "id", [], "any", false, false, false, 280))));
        yield ",
                            parent_fk_field: \"";
        // line 281
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(CoreExtension::getAttribute($this->env, $this->source, ($context["item"] ?? null), "getForeignKeyField", [], "method", false, false, false, 281), "js"), "html", null, true);
        yield "\",
                            begin: \"";
        // line 282
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape((($_v25 = CoreExtension::getAttribute($this->env, $this->source, ($context["subitem"] ?? null), "fields", [], "any", false, false, false, 282)) && is_array($_v25) || $_v25 instanceof ArrayAccess ? ($_v25["begin"] ?? null) : null), "js"), "html", null, true);
        yield "\",
                            end: \"";
        // line 283
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape((($_v26 = CoreExtension::getAttribute($this->env, $this->source, ($context["subitem"] ?? null), "fields", [], "any", false, false, false, 283)) && is_array($_v26) || $_v26 instanceof ArrayAccess ? ($_v26["end"] ?? null) : null), "js"), "html", null, true);
        yield "\",
                        });
                    }
                </script>
                <div class=\"col-12\">
                ";
        // line 288
        if ((CoreExtension::getAttribute($this->env, $this->source, ($context["subitem"] ?? null), "can", [(($_v27 = CoreExtension::getAttribute($this->env, $this->source, ($context["subitem"] ?? null), "fields", [], "any", false, false, false, 288)) && is_array($_v27) || $_v27 instanceof ArrayAccess ? ($_v27["id"] ?? null) : null), Twig\Extension\CoreExtension::constant("UPDATE")], "method", false, false, false, 288) && (($_v28 = CoreExtension::getAttribute($this->env, $this->source, ($context["subitem"] ?? null), "fields", [], "any", false, false, false, 288)) && is_array($_v28) || $_v28 instanceof ArrayAccess ? ($_v28["begin"] ?? null) : null))) {
            // line 289
            yield "                    <script type=\"text/javascript\">
                        showPlanUpdate";
            // line 290
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(($context["rand"] ?? null), "html", null, true);
            yield "();
                    </script>
                    <button id=\"unplan";
            // line 292
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(($context["rand"] ?? null), "html", null, true);
            yield "\" class=\"btn btn-outline-warning\" type=\"submit\" name=\"unplan\"
                            onclick=\"return confirm('";
            // line 293
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(__("Confirm the deletion of planning?"), "js"), "html", null, true);
            yield "');\">
                        <i class=\"fas ti ti-calendar-off\"></i>
                        <span>";
            // line 295
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(__("Unplan"), "html", null, true);
            yield "</span>
                    </button>
                ";
        } elseif ((CoreExtension::getAttribute($this->env, $this->source,         // line 297
($context["item"] ?? null), "isAllowedStatus", [(($_v29 = CoreExtension::getAttribute($this->env, $this->source, ($context["item"] ?? null), "fields", [], "any", false, false, false, 297)) && is_array($_v29) || $_v29 instanceof ArrayAccess ? ($_v29["status"] ?? null) : null), Twig\Extension\CoreExtension::constant("CommonITILObject::PLANNED")], "method", false, false, false, 297) || !CoreExtension::inFilter(Twig\Extension\CoreExtension::constant("CommonITILObject::PLANNED"), CoreExtension::getAttribute($this->env, $this->source, ($context["item"] ?? null), "getAllStatusArray", [], "method", false, false, false, 297)))) {
            // line 298
            yield "                    <button id=\"plan";
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(($context["rand"] ?? null), "html", null, true);
            yield "\" class=\"btn btn-outline-secondary text-truncate\" onclick=\"showPlanUpdate";
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(($context["rand"] ?? null), "html", null, true);
            yield "()\" type=\"button\">
                        <i class=\"ti ti-calendar\"></i>
                        <span>";
            // line 300
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(__("Plan this task"), "html", null, true);
            yield "</span>
                    </button>
                ";
        }
        // line 303
        yield "                <div id=\"viewplan";
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(($context["rand"] ?? null), "html", null, true);
        yield "\"></div>
                </div>
            </div>
        </div>
    </div>

    ";
        // line 309
        if (( !array_key_exists("disable_pending_reasons", $context) || (($context["disable_pending_reasons"] ?? null) == false))) {
            // line 310
            yield "        ";
            $context["pending_reasons"] = ('' === $tmp = \Twig\Extension\CoreExtension::captureOutput((function () use (&$context, $macros, $blocks) {
                // line 311
                yield "            ";
                $context["show_pending_reasons_actions"] = (((($_v30 = CoreExtension::getAttribute($this->env, $this->source, ($context["item"] ?? null), "fields", [], "any", false, false, false, 311)) && is_array($_v30) || $_v30 instanceof ArrayAccess ? ($_v30["status"] ?? null) : null) == Twig\Extension\CoreExtension::constant("CommonITILObject::WAITING")) &&  !($context["has_pending_reason"] ?? null));
                // line 312
                yield "            ";
                if (((($this->extensions['Glpi\Application\View\Extension\SessionExtension']->getCurrentInterface() == "central") && CoreExtension::getAttribute($this->env, $this->source, ($context["item"] ?? null), "isAllowedStatus", [(($_v31 = CoreExtension::getAttribute($this->env, $this->source, ($context["item"] ?? null), "fields", [], "any", false, false, false, 312)) && is_array($_v31) || $_v31 instanceof ArrayAccess ? ($_v31["status"] ?? null) : null), Twig\Extension\CoreExtension::constant("CommonITILObject::WAITING")], "method", false, false, false, 312)) && $this->extensions['Glpi\Application\View\Extension\PhpExtension']->call("PendingReason_Item::canDisplayPendingReasonForItem", [($context["subitem"] ?? null)]))) {
                    // line 313
                    yield "                <span
                    class=\"input-group-text bg-yellow-lt py-0 pe-0 ";
                    // line 314
                    yield (((($tmp = ($context["show_pending_reasons_actions"] ?? null)) && $tmp instanceof Markup ? (string) $tmp : $tmp)) ? ("flex-fill") : (""));
                    yield "\"
                    id=\"pending-reasons-control-";
                    // line 315
                    yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(($context["rand"] ?? null), "html", null, true);
                    yield "\"
                >
                    <span
                        class=\"d-inline-flex align-items-center\"
                        title=\"";
                    // line 319
                    yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(__("Set the status to pending"), "html", null, true);
                    yield "\"
                        data-bs-toggle=\"tooltip\"
                        data-bs-placement=\"top\"
                        role=\"button\"
                    >
                        <i class=\"ti ti-player-pause-filled me-2\"></i>
                        <label class=\"form-check form-switch mt-2\">
                        <input type=\"hidden\" name=\"pending\" value=\"0\"/>
                        <input
                            type=\"checkbox\"
                            name=\"pending\"
                            value=\"1\"
                            class=\"form-check-input\"
                            id=\"enable-pending-reasons-";
                    // line 332
                    yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(($context["rand"] ?? null), "html", null, true);
                    yield "\"
                            role=\"button\"
                            ";
                    // line 334
                    yield ((((($_v32 = CoreExtension::getAttribute($this->env, $this->source, ($context["item"] ?? null), "fields", [], "any", false, false, false, 334)) && is_array($_v32) || $_v32 instanceof ArrayAccess ? ($_v32["status"] ?? null) : null) == Twig\Extension\CoreExtension::constant("CommonITILObject::WAITING"))) ? ("checked") : (""));
                    yield "
                            data-bs-toggle=\"collapse\"
                            data-bs-target=\"#pending-reasons-setup-";
                    // line 336
                    yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(($context["rand"] ?? null), "html", null, true);
                    yield "\"
                        />
                        </label>
                    </span>

                    ";
                    // line 341
                    if ((($tmp =  !($context["has_pending_reason"] ?? null)) && $tmp instanceof Markup ? (string) $tmp : $tmp)) {
                        // line 342
                        yield "                        <div
                            class=\"collapse ps-2 py-1 flex-fill ";
                        // line 343
                        yield (((($tmp = ($context["show_pending_reasons_actions"] ?? null)) && $tmp instanceof Markup ? (string) $tmp : $tmp)) ? ("show") : (""));
                        yield "\"
                            aria-expanded=\"";
                        // line 344
                        yield (((($tmp = ($context["show_pending_reasons_actions"] ?? null)) && $tmp instanceof Markup ? (string) $tmp : $tmp)) ? ("true") : ("false"));
                        yield "\"
                            id=\"pending-reasons-setup-";
                        // line 345
                        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(($context["rand"] ?? null), "html", null, true);
                        yield "\"
                        >
                            ";
                        // line 347
                        yield Twig\Extension\CoreExtension::include($this->env, $context, "components/itilobject/timeline/pending_reasons.html.twig");
                        yield "
                        </div>
                    ";
                    }
                    // line 350
                    yield "                </span>
            ";
                }
                // line 352
                yield "        ";
                yield from [];
            })())) ? '' : new Markup($tmp, $this->env->getCharset());
            // line 353
            yield "    ";
        }
        // line 354
        yield "
    ";
        // line 355
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->extensions['Glpi\Application\View\Extension\PluginExtension']->callPluginHook(Twig\Extension\CoreExtension::constant("Glpi\\Plugin\\Hooks::POST_ITEM_FORM"), ["item" => ($context["subitem"] ?? null), "options" => ($context["params"] ?? null)]), "html", null, true);
        yield "
    ";
        // line 357
        yield "    <div class=\"d-flex card-footer mx-n3 mb-n3 flex-wrap\" style=\"row-gap: 10px; min-height: 79px\">
        ";
        // line 358
        if (((($_v33 = CoreExtension::getAttribute($this->env, $this->source, ($context["subitem"] ?? null), "fields", [], "any", false, false, false, 358)) && is_array($_v33) || $_v33 instanceof ArrayAccess ? ($_v33["id"] ?? null) : null) <= 0)) {
            // line 359
            yield "            ";
            // line 360
            yield "            <div class=\"input-group flex-nowrap\">
                <button
                    class=\"btn btn-primary\"
                    type=\"submit\"
                    name=\"add\"
                    aria-label=\"";
            // line 365
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(_x("button", "Add"), "html", null, true);
            yield "\"
                >
                <i class=\"ti ti-plus\"></i>
                <span>";
            // line 368
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(_x("button", "Add"), "html", null, true);
            yield "</span>
                </button>
                ";
            // line 370
            if (( !array_key_exists("disable_pending_reasons", $context) || (($context["disable_pending_reasons"] ?? null) == false))) {
                // line 371
                yield "                    ";
                yield ($context["pending_reasons"] ?? null);
                yield "
                ";
            }
            // line 373
            yield "            </div>
        ";
        } else {
            // line 375
            yield "            <input type=\"hidden\" name=\"id\" value=\"";
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape((($_v34 = CoreExtension::getAttribute($this->env, $this->source, ($context["subitem"] ?? null), "fields", [], "any", false, false, false, 375)) && is_array($_v34) || $_v34 instanceof ArrayAccess ? ($_v34["id"] ?? null) : null), "html", null, true);
            yield "\" />
            <button class=\"btn btn-primary me-2\" type=\"submit\" name=\"update\">
                <i class=\"ti ti-device-floppy\"></i>
                <span>";
            // line 378
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(_x("button", "Save"), "html", null, true);
            yield "</span>
            </button>

            ";
            // line 381
            if ((($tmp = CoreExtension::getAttribute($this->env, $this->source, ($context["subitem"] ?? null), "can", [(($_v35 = CoreExtension::getAttribute($this->env, $this->source, ($context["subitem"] ?? null), "fields", [], "any", false, false, false, 381)) && is_array($_v35) || $_v35 instanceof ArrayAccess ? ($_v35["id"] ?? null) : null), Twig\Extension\CoreExtension::constant("PURGE")], "method", false, false, false, 381)) && $tmp instanceof Markup ? (string) $tmp : $tmp)) {
                // line 382
                yield "                <button class=\"btn btn-outline-danger me-2\" type=\"submit\" name=\"purge\"
                        onclick=\"return confirm('";
                // line 383
                yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(__("Confirm the final deletion?"), "js"), "html", null, true);
                yield "');\">
                <i class=\"ti ti-trash\"></i>
                <span>";
                // line 385
                yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(_x("button", "Delete permanently"), "html", null, true);
                yield "</span>
                </button>
            ";
            }
            // line 388
            yield "            ";
            if (( !array_key_exists("disable_pending_reasons", $context) || (($context["disable_pending_reasons"] ?? null) == false))) {
                // line 389
                yield "                ";
                yield ($context["pending_reasons"] ?? null);
                yield "
            ";
            }
            // line 391
            yield "        ";
        }
        // line 392
        yield "    </div>

    ";
        // line 394
        if ((($tmp = ($context["add_html_form"] ?? null)) && $tmp instanceof Markup ? (string) $tmp : $tmp)) {
            // line 395
            yield "        <input type=\"hidden\" name=\"_glpi_csrf_token\" value=\"";
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(Session::getNewCSRFToken(), "html", null, true);
            yield "\" />
        </form>
    ";
        }
        // line 398
        yield "</div>
";
        yield from [];
    }

    /**
     * @codeCoverageIgnore
     */
    public function getTemplateName(): string
    {
        return "components/itilobject/timeline/form_task_main_form.html.twig";
    }

    /**
     * @codeCoverageIgnore
     */
    public function isTraitable(): bool
    {
        return false;
    }

    /**
     * @codeCoverageIgnore
     */
    public function getDebugInfo(): array
    {
        return array (  669 => 398,  662 => 395,  660 => 394,  656 => 392,  653 => 391,  647 => 389,  644 => 388,  638 => 385,  633 => 383,  630 => 382,  628 => 381,  622 => 378,  615 => 375,  611 => 373,  605 => 371,  603 => 370,  598 => 368,  592 => 365,  585 => 360,  583 => 359,  581 => 358,  578 => 357,  574 => 355,  571 => 354,  568 => 353,  564 => 352,  560 => 350,  554 => 347,  549 => 345,  545 => 344,  541 => 343,  538 => 342,  536 => 341,  528 => 336,  523 => 334,  518 => 332,  502 => 319,  495 => 315,  491 => 314,  488 => 313,  485 => 312,  482 => 311,  479 => 310,  477 => 309,  467 => 303,  461 => 300,  453 => 298,  451 => 297,  446 => 295,  441 => 293,  437 => 292,  432 => 290,  429 => 289,  427 => 288,  419 => 283,  415 => 282,  411 => 281,  407 => 280,  403 => 279,  399 => 278,  395 => 277,  391 => 276,  387 => 275,  383 => 274,  377 => 271,  371 => 270,  367 => 269,  363 => 268,  358 => 265,  356 => 263,  355 => 261,  354 => 257,  353 => 256,  351 => 253,  344 => 251,  341 => 250,  337 => 247,  335 => 245,  334 => 243,  333 => 239,  332 => 238,  330 => 235,  323 => 233,  320 => 232,  317 => 230,  313 => 228,  311 => 222,  310 => 221,  308 => 219,  304 => 217,  302 => 214,  300 => 211,  297 => 210,  295 => 209,  292 => 208,  285 => 206,  282 => 205,  279 => 203,  275 => 201,  273 => 199,  272 => 195,  270 => 192,  261 => 187,  257 => 185,  254 => 184,  252 => 183,  248 => 181,  246 => 175,  245 => 171,  244 => 170,  242 => 168,  235 => 166,  233 => 165,  229 => 163,  227 => 161,  226 => 157,  225 => 156,  224 => 154,  221 => 153,  217 => 152,  214 => 151,  212 => 150,  209 => 149,  202 => 147,  199 => 146,  195 => 143,  193 => 141,  192 => 137,  191 => 133,  190 => 132,  188 => 129,  181 => 127,  178 => 126,  174 => 123,  172 => 121,  171 => 117,  170 => 116,  168 => 114,  161 => 111,  157 => 109,  155 => 108,  151 => 106,  149 => 104,  148 => 103,  147 => 102,  146 => 98,  145 => 97,  143 => 94,  136 => 91,  132 => 90,  129 => 89,  127 => 88,  121 => 84,  119 => 80,  118 => 79,  117 => 78,  116 => 71,  115 => 69,  108 => 65,  101 => 63,  97 => 62,  94 => 61,  88 => 58,  82 => 55,  75 => 50,  73 => 49,  69 => 47,  67 => 46,  64 => 44,  62 => 43,  60 => 42,  58 => 41,  56 => 40,  54 => 37,  52 => 36,  50 => 35,  47 => 34,  45 => 33,  42 => 32,);
    }

    public function getSourceContext(): Source
    {
        return new Source("", "components/itilobject/timeline/form_task_main_form.html.twig", "C:\\xampp\\htdocs\\glpi\\templates\\components\\itilobject\\timeline\\form_task_main_form.html.twig");
    }
}
