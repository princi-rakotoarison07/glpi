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

/* pages/management/cost.html.twig */
class __TwigTemplate_f5c5829581794a7334b8df78ced78acd extends Template
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

        $this->blocks = [
            'form_fields' => [$this, 'block_form_fields'],
        ];
    }

    protected function doGetParent(array $context): bool|string|Template|TemplateWrapper
    {
        // line 33
        return "generic_show_form.html.twig";
    }

    protected function doDisplay(array $context, array $blocks = []): iterable
    {
        $macros = $this->macros;
        // line 34
        $macros["fields"] = $this->macros["fields"] = $this->load("components/form/fields_macros.html.twig", 34)->unwrap();
        // line 35
        $macros["inputs"] = $this->macros["inputs"] = $this->load("components/form/basic_inputs_macros.html.twig", 35)->unwrap();
        // line 33
        $this->parent = $this->load("generic_show_form.html.twig", 33);
        yield from $this->parent->unwrap()->yield($context, array_merge($this->blocks, $blocks));
    }

    // line 37
    /**
     * @return iterable<null|scalar|\Stringable>
     */
    public function block_form_fields(array $context, array $blocks = []): iterable
    {
        $macros = $this->macros;
        // line 38
        yield "    ";
        yield $macros["inputs"]->getTemplateForMacro("macro_hidden", $context, 38, $this->getSourceContext())->macro_hidden(...[($context["items_id_field"] ?? null), ($context["parent_id"] ?? null)]);
        yield "
    ";
        // line 39
        yield $macros["fields"]->getTemplateForMacro("macro_textField", $context, 39, $this->getSourceContext())->macro_textField(...["name", (($_v0 = CoreExtension::getAttribute($this->env, $this->source, ($context["item"] ?? null), "fields", [], "any", false, false, false, 39)) && is_array($_v0) || $_v0 instanceof ArrayAccess ? ($_v0["name"] ?? null) : null), __("Name")]);
        yield "
    ";
        // line 40
        yield $macros["fields"]->getTemplateForMacro("macro_dropdownField", $context, 40, $this->getSourceContext())->macro_dropdownField(...["Budget", "budgets_id", (($_v1 = CoreExtension::getAttribute($this->env, $this->source, ($context["item"] ?? null), "fields", [], "any", false, false, false, 40)) && is_array($_v1) || $_v1 instanceof ArrayAccess ? ($_v1["budgets_id"] ?? null) : null), $this->extensions['Glpi\Application\View\Extension\ItemtypeExtension']->getItemtypeName("Budget", 1), ["entity" => (($_v2 = CoreExtension::getAttribute($this->env, $this->source,         // line 41
($context["item"] ?? null), "fields", [], "any", false, false, false, 41)) && is_array($_v2) || $_v2 instanceof ArrayAccess ? ($_v2["entities_id"] ?? null) : null)]]);
        // line 42
        yield "

    ";
        // line 44
        yield $macros["fields"]->getTemplateForMacro("macro_dateField", $context, 44, $this->getSourceContext())->macro_dateField(...["begin_date", (($_v3 = CoreExtension::getAttribute($this->env, $this->source, ($context["item"] ?? null), "fields", [], "any", false, false, false, 44)) && is_array($_v3) || $_v3 instanceof ArrayAccess ? ($_v3["begin_date"] ?? null) : null), __("Begin date"), ["clearable" => true]]);
        // line 46
        yield "
    ";
        // line 47
        if ((($tmp = CoreExtension::getAttribute($this->env, $this->source, ($context["item"] ?? null), "isField", ["actiontime"], "method", false, false, false, 47)) && $tmp instanceof Markup ? (string) $tmp : $tmp)) {
            // line 48
            yield "        ";
            yield $macros["fields"]->getTemplateForMacro("macro_dropdownTimestampField", $context, 48, $this->getSourceContext())->macro_dropdownTimestampField(...["actiontime", (($_v4 = CoreExtension::getAttribute($this->env, $this->source, ($context["item"] ?? null), "fields", [], "any", false, false, false, 48)) && is_array($_v4) || $_v4 instanceof ArrayAccess ? ($_v4["actiontime"] ?? null) : null), __("Duration"), ["addfirstminutes" => true, "min" => Twig\Extension\CoreExtension::constant("DAY_TIMESTAMP"), "max" => (Twig\Extension\CoreExtension::constant("DAY_TIMESTAMP") * 50), "step" => Twig\Extension\CoreExtension::constant("DAY_TIMESTAMP")]]);
            // line 53
            yield "
    ";
        }
        // line 55
        yield "
    ";
        // line 56
        yield $macros["fields"]->getTemplateForMacro("macro_dateField", $context, 56, $this->getSourceContext())->macro_dateField(...["end_date", (($_v5 = CoreExtension::getAttribute($this->env, $this->source, ($context["item"] ?? null), "fields", [], "any", false, false, false, 56)) && is_array($_v5) || $_v5 instanceof ArrayAccess ? ($_v5["end_date"] ?? null) : null), __("End date"), ["clearable" => true]]);
        // line 58
        yield "

    ";
        // line 60
        if ((($tmp = CoreExtension::getAttribute($this->env, $this->source, ($context["item"] ?? null), "isField", ["cost_time"], "method", false, false, false, 60)) && $tmp instanceof Markup ? (string) $tmp : $tmp)) {
            // line 61
            yield "        ";
            yield $macros["fields"]->getTemplateForMacro("macro_numberField", $context, 61, $this->getSourceContext())->macro_numberField(...["cost_time", (($_v6 = CoreExtension::getAttribute($this->env, $this->source, ($context["item"] ?? null), "fields", [], "any", false, false, false, 61)) && is_array($_v6) || $_v6 instanceof ArrayAccess ? ($_v6["cost_time"] ?? null) : null), __("Time cost"), ["min" => 0, "max" => Twig\Extension\CoreExtension::constant("PHP_INT_MAX"), "step" => 0.0001]]);
            // line 65
            yield "
    ";
        }
        // line 67
        yield "
    ";
        // line 68
        if ((($tmp = CoreExtension::getAttribute($this->env, $this->source, ($context["item"] ?? null), "isField", ["cost"], "method", false, false, false, 68)) && $tmp instanceof Markup ? (string) $tmp : $tmp)) {
            // line 69
            yield "        ";
            yield $macros["fields"]->getTemplateForMacro("macro_numberField", $context, 69, $this->getSourceContext())->macro_numberField(...["cost", (($_v7 = CoreExtension::getAttribute($this->env, $this->source, ($context["item"] ?? null), "fields", [], "any", false, false, false, 69)) && is_array($_v7) || $_v7 instanceof ArrayAccess ? ($_v7["cost"] ?? null) : null), _n("Cost", "Costs", 1), ["min" => 0, "max" => Twig\Extension\CoreExtension::constant("PHP_INT_MAX"), "step" => 0.0001]]);
            // line 73
            yield "
    ";
        }
        // line 75
        yield "
    ";
        // line 76
        yield $macros["fields"]->getTemplateForMacro("macro_textareaField", $context, 76, $this->getSourceContext())->macro_textareaField(...["comment", (($_v8 = CoreExtension::getAttribute($this->env, $this->source, ($context["item"] ?? null), "fields", [], "any", false, false, false, 76)) && is_array($_v8) || $_v8 instanceof ArrayAccess ? ($_v8["comment"] ?? null) : null), _n("Comment", "Comments", Session::getPluralNumber())]);
        yield "
    ";
        // line 77
        if ((($tmp = CoreExtension::getAttribute($this->env, $this->source, ($context["item"] ?? null), "isField", ["cost_fixed"], "method", false, false, false, 77)) && $tmp instanceof Markup ? (string) $tmp : $tmp)) {
            // line 78
            yield "        ";
            yield $macros["fields"]->getTemplateForMacro("macro_numberField", $context, 78, $this->getSourceContext())->macro_numberField(...["cost_fixed", (($_v9 = CoreExtension::getAttribute($this->env, $this->source, ($context["item"] ?? null), "fields", [], "any", false, false, false, 78)) && is_array($_v9) || $_v9 instanceof ArrayAccess ? ($_v9["cost_fixed"] ?? null) : null), __("Fixed cost"), ["min" => 0, "max" => Twig\Extension\CoreExtension::constant("PHP_INT_MAX"), "step" => 0.0001]]);
            // line 82
            yield "
    ";
        }
        // line 84
        yield "    ";
        yield $macros["fields"]->getTemplateForMacro("macro_nullField", $context, 84, $this->getSourceContext())->macro_nullField(...[]);
        yield "
    ";
        // line 85
        if ((($tmp = CoreExtension::getAttribute($this->env, $this->source, ($context["item"] ?? null), "isField", ["cost_material"], "method", false, false, false, 85)) && $tmp instanceof Markup ? (string) $tmp : $tmp)) {
            // line 86
            yield "        ";
            yield $macros["fields"]->getTemplateForMacro("macro_numberField", $context, 86, $this->getSourceContext())->macro_numberField(...["cost_material", (($_v10 = CoreExtension::getAttribute($this->env, $this->source, ($context["item"] ?? null), "fields", [], "any", false, false, false, 86)) && is_array($_v10) || $_v10 instanceof ArrayAccess ? ($_v10["cost_material"] ?? null) : null), __("Material cost"), ["min" => 0, "max" => Twig\Extension\CoreExtension::constant("PHP_INT_MAX"), "step" => 0.0001]]);
            // line 90
            yield "
    ";
        }
        // line 92
        yield "
";
        yield from [];
    }

    /**
     * @codeCoverageIgnore
     */
    public function getTemplateName(): string
    {
        return "pages/management/cost.html.twig";
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
        return array (  153 => 92,  149 => 90,  146 => 86,  144 => 85,  139 => 84,  135 => 82,  132 => 78,  130 => 77,  126 => 76,  123 => 75,  119 => 73,  116 => 69,  114 => 68,  111 => 67,  107 => 65,  104 => 61,  102 => 60,  98 => 58,  96 => 56,  93 => 55,  89 => 53,  86 => 48,  84 => 47,  81 => 46,  79 => 44,  75 => 42,  73 => 41,  72 => 40,  68 => 39,  63 => 38,  56 => 37,  51 => 33,  49 => 35,  47 => 34,  40 => 33,);
    }

    public function getSourceContext(): Source
    {
        return new Source("", "pages/management/cost.html.twig", "C:\\xampp\\htdocs\\glpi\\templates\\pages\\management\\cost.html.twig");
    }
}
