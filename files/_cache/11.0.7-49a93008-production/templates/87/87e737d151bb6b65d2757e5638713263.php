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

/* components/form/item_itilobject_item_list.html.twig */
class __TwigTemplate_3394ef8880889cf0a66b11a1ac34a704 extends Template
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
        if ((($tmp = ($context["linknewitil"] ?? null)) && $tmp instanceof Markup ? (string) $tmp : $tmp)) {
            // line 34
            yield "    <div class='mb-3'>
        ";
            // line 35
            $context["label"] = (((CoreExtension::getAttribute($this->env, $this->source, ($context["item"] ?? null), "getType", [], "method", false, false, false, 35) == "User")) ? (Twig\Extension\CoreExtension::sprintf(__("New %s for this user"), $this->extensions['Glpi\Application\View\Extension\ItemtypeExtension']->getItemtypeName(($context["itemtype_1"] ?? null), 1))) : (Twig\Extension\CoreExtension::sprintf(__("New %s for this item"), $this->extensions['Glpi\Application\View\Extension\ItemtypeExtension']->getItemtypeName(($context["itemtype_1"] ?? null), 1))));
            // line 36
            yield "        ";
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->extensions['Glpi\Application\View\Extension\PhpExtension']->call("Html::showSimpleForm", [$this->extensions['Glpi\Application\View\Extension\ItemtypeExtension']->getItemtypeFormPath(($context["itemtype_1"] ?? null)), "_add_fromitem", ($context["label"] ?? null), ["itemtype" => CoreExtension::getAttribute($this->env, $this->source, ($context["item"] ?? null), "getType", [], "method", false, false, false, 36), "items_id" => CoreExtension::getAttribute($this->env, $this->source, ($context["item"] ?? null), "getID", [], "method", false, false, false, 36)]]), "html", null, true);
            yield "
    </div>
";
        }
        // line 39
        yield "<div class=\"mb-3\">
    ";
        // line 40
        if ((($context["number"] ?? null) > 0)) {
            // line 41
            yield "        ";
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->extensions['Glpi\Application\View\Extension\PhpExtension']->call("Session::initNavigateListItems", [($context["itemtype_1"] ?? null), ((__(CoreExtension::getAttribute($this->env, $this->source, ($context["item"] ?? null), "getTypeName", [1], "method", false, false, false, 41)) . " ") . CoreExtension::getAttribute($this->env, $this->source, ($context["item"] ?? null), "getName", [], "method", false, false, false, 41))]), "html", null, true);
            yield "
        ";
            // line 42
            $context["superheader_raw"] = false;
            // line 43
            yield "        ";
            if ((($tmp = ($context["readall"] ?? null)) && $tmp instanceof Markup ? (string) $tmp : $tmp)) {
                // line 44
                yield "            ";
                $context["superheader"] = ('' === $tmp = \Twig\Extension\CoreExtension::captureOutput((function () use (&$context, $macros, $blocks) {
                    // line 45
                    yield "                ";
                    yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(Twig\Extension\CoreExtension::sprintf(__("%d linked %s"), ($context["number"] ?? null), $this->extensions['Glpi\Application\View\Extension\ItemtypeExtension']->getItemtypeName(($context["itemtype_1"] ?? null), ($context["number"] ?? null))), "html", null, true);
                    yield "
                (<a href=\"";
                    // line 46
                    yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->extensions['Glpi\Application\View\Extension\ItemtypeExtension']->getItemtypeSearchPath(($context["itemtype_1"] ?? null)), "html", null, true);
                    yield "?";
                    yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(Twig\Extension\CoreExtension::urlencode(($context["params"] ?? null), "&"), "html", null, true);
                    yield "\">";
                    yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(__("Show all"), "html", null, true);
                    yield "</a>)
            ";
                    yield from [];
                })())) ? '' : new Markup($tmp, $this->env->getCharset());
                // line 48
                yield "            ";
                $context["superheader_raw"] = true;
                // line 49
                yield "        ";
            } else {
                // line 50
                yield "            ";
                $context["superheader"] = Twig\Extension\CoreExtension::sprintf(__("You don't have right to see all %s"), $this->extensions['Glpi\Application\View\Extension\ItemtypeExtension']->getItemtypeName(($context["itemtype_1"] ?? null), Session::getPluralNumber()));
                // line 51
                yield "        ";
            }
            // line 52
            yield "    ";
        }
        // line 53
        yield "
    ";
        // line 54
        $context["values"] = [];
        // line 55
        yield "
    ";
        // line 56
        $context['_parent'] = $context;
        $context['_seq'] = CoreExtension::ensureTraversable(($context["iterator"] ?? null));
        foreach ($context['_seq'] as $context["_key"] => $context["data"]) {
            // line 57
            yield "        ";
            $context["values"] = Twig\Extension\CoreExtension::merge(($context["values"] ?? null), [Twig\Extension\CoreExtension::length($this->env->getCharset(), ($context["values"] ?? null)) => ["id" => CoreExtension::getAttribute($this->env, $this->source, ($context["item"] ?? null), "getID", [], "method", false, false, false, 57), "item_id" => (($_v0 = $context["data"]) && is_array($_v0) || $_v0 instanceof ArrayAccess ? ($_v0["id"] ?? null) : null), "itemtype" => ($context["itemtype_1"] ?? null), "associated_elements" => ""]]);
            // line 58
            yield "    ";
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_key'], $context['data'], $context['_parent']);
        $context = array_intersect_key($context, $_parent) + $_parent;
        // line 59
        yield "
    ";
        // line 60
        $context["common_columns"] = $this->extensions['Glpi\Application\View\Extension\PhpExtension']->call((($context["itemtype_1"] ?? null) . "::getCommonDatatableColumns"), []);
        // line 61
        yield "    ";
        $context["entries"] = $this->extensions['Glpi\Application\View\Extension\PhpExtension']->call((($context["itemtype_1"] ?? null) . "::getDatatableEntries"), [($context["values"] ?? null)]);
        // line 62
        yield "    ";
        $context["datatable_params"] = ["super_header" => ["label" => ((        // line 64
array_key_exists("superheader", $context)) ? (Twig\Extension\CoreExtension::default(($context["superheader"] ?? null), "")) : ("")), "is_raw" => ((        // line 65
array_key_exists("superheader_raw", $context)) ? (Twig\Extension\CoreExtension::default(($context["superheader_raw"] ?? null), false)) : (false))], "is_tab" => true, "nofilter" => true, "nosort" => true, "entries" =>         // line 70
($context["entries"] ?? null), "total_number" => Twig\Extension\CoreExtension::length($this->env->getCharset(),         // line 71
($context["entries"] ?? null)), "showmassiveactions" => ((        // line 72
array_key_exists("canedit", $context)) ? (Twig\Extension\CoreExtension::default(($context["canedit"] ?? null), false)) : (false))];
        // line 74
        yield "    ";
        $context["merged_params"] = Twig\Extension\CoreExtension::merge(($context["datatable_params"] ?? null), ($context["common_columns"] ?? null));
        // line 75
        yield "
    ";
        // line 76
        yield Twig\Extension\CoreExtension::include($this->env, $context, "components/datatable.html.twig", ($context["merged_params"] ?? null), false);
        yield "
</div>

";
        // line 79
        if ((($tmp = ($context["showform"] ?? null)) && $tmp instanceof Markup ? (string) $tmp : $tmp)) {
            // line 80
            yield "    ";
            if ((($context["number2"] ?? null) > 0)) {
                // line 81
                yield "        ";
                $context["values"] = [];
                // line 82
                yield "
        ";
                // line 83
                $context['_parent'] = $context;
                $context['_seq'] = CoreExtension::ensureTraversable(($context["iterator2"] ?? null));
                foreach ($context['_seq'] as $context["_key"] => $context["data"]) {
                    // line 84
                    yield "            ";
                    $context["values"] = Twig\Extension\CoreExtension::merge(($context["values"] ?? null), [Twig\Extension\CoreExtension::length($this->env->getCharset(), ($context["values"] ?? null)) => ["id" => CoreExtension::getAttribute($this->env, $this->source, ($context["item"] ?? null), "getID", [], "method", false, false, false, 84), "item_id" => (($_v1 = $context["data"]) && is_array($_v1) || $_v1 instanceof ArrayAccess ? ($_v1["id"] ?? null) : null), "itemtype" => ($context["itemtype_1"] ?? null), "associated_elements" => ""]]);
                    // line 85
                    yield "        ";
                }
                $_parent = $context['_parent'];
                unset($context['_seq'], $context['_key'], $context['data'], $context['_parent']);
                $context = array_intersect_key($context, $_parent) + $_parent;
                // line 86
                yield "
        ";
                // line 87
                $context["common_columns"] = $this->extensions['Glpi\Application\View\Extension\PhpExtension']->call((($context["itemtype_1"] ?? null) . "::getCommonDatatableColumns"), []);
                // line 88
                yield "        ";
                $context["entries2"] = $this->extensions['Glpi\Application\View\Extension\PhpExtension']->call((($context["itemtype_1"] ?? null) . "::getDatatableEntries"), [($context["values"] ?? null)]);
                // line 89
                yield "        ";
                $context["datatable_params"] = ["super_header" => Twig\Extension\CoreExtension::sprintf(__("%s on linked items"), $this->extensions['Glpi\Application\View\Extension\ItemtypeExtension']->getItemtypeName(                // line 90
($context["itemtype_1"] ?? null), ($context["number"] ?? null))), "is_tab" => true, "nofilter" => true, "nosort" => true, "entries" =>                 // line 94
($context["entries2"] ?? null), "total_number" => Twig\Extension\CoreExtension::length($this->env->getCharset(),                 // line 95
($context["entries2"] ?? null)), "showmassiveactions" =>                 // line 96
($context["canedit"] ?? null)];
                // line 98
                yield "        ";
                $context["merged_params"] = Twig\Extension\CoreExtension::merge(($context["datatable_params"] ?? null), ($context["common_columns"] ?? null));
                // line 99
                yield "
        ";
                // line 100
                yield Twig\Extension\CoreExtension::include($this->env, $context, "components/datatable.html.twig", ($context["merged_params"] ?? null), false);
                yield "
    ";
            }
        }
        yield from [];
    }

    /**
     * @codeCoverageIgnore
     */
    public function getTemplateName(): string
    {
        return "components/form/item_itilobject_item_list.html.twig";
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
        return array (  201 => 100,  198 => 99,  195 => 98,  193 => 96,  192 => 95,  191 => 94,  190 => 90,  188 => 89,  185 => 88,  183 => 87,  180 => 86,  174 => 85,  171 => 84,  167 => 83,  164 => 82,  161 => 81,  158 => 80,  156 => 79,  150 => 76,  147 => 75,  144 => 74,  142 => 72,  141 => 71,  140 => 70,  139 => 65,  138 => 64,  136 => 62,  133 => 61,  131 => 60,  128 => 59,  122 => 58,  119 => 57,  115 => 56,  112 => 55,  110 => 54,  107 => 53,  104 => 52,  101 => 51,  98 => 50,  95 => 49,  92 => 48,  82 => 46,  77 => 45,  74 => 44,  71 => 43,  69 => 42,  64 => 41,  62 => 40,  59 => 39,  52 => 36,  50 => 35,  47 => 34,  45 => 33,  42 => 32,);
    }

    public function getSourceContext(): Source
    {
        return new Source("", "components/form/item_itilobject_item_list.html.twig", "C:\\xampp\\htdocs\\glpi\\templates\\components\\form\\item_itilobject_item_list.html.twig");
    }
}
