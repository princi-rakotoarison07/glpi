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

/* pages/assets/cable.html.twig */
class __TwigTemplate_edb799c2cbcbca0e708b1d99b188e4ae extends Template
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
            'more_fields' => [$this, 'block_more_fields'],
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
        $context["params"] = (((array_key_exists("params", $context) &&  !(null === $context["params"]))) ? ($context["params"]) : ([]));
        // line 33
        $this->parent = $this->load("generic_show_form.html.twig", 33);
        yield from $this->parent->unwrap()->yield($context, array_merge($this->blocks, $blocks));
    }

    // line 37
    /**
     * @return iterable<null|scalar|\Stringable>
     */
    public function block_more_fields(array $context, array $blocks = []): iterable
    {
        $macros = $this->macros;
        // line 38
        yield "   ";
        yield $macros["fields"]->getTemplateForMacro("macro_dropdownField", $context, 38, $this->getSourceContext())->macro_dropdownField(...["CableStrand", "cablestrands_id", (($_v0 = CoreExtension::getAttribute($this->env, $this->source,         // line 41
($context["item"] ?? null), "fields", [], "any", false, false, false, 41)) && is_array($_v0) || $_v0 instanceof ArrayAccess ? ($_v0["cablestrands_id"] ?? null) : null), $this->extensions['Glpi\Application\View\Extension\ItemtypeExtension']->getItemtypeName("CableStrand"),         // line 43
($context["field_options"] ?? null)]);
        // line 44
        yield "

   ";
        // line 46
        yield $macros["fields"]->getTemplateForMacro("macro_colorField", $context, 46, $this->getSourceContext())->macro_colorField(...["color", (($_v1 = CoreExtension::getAttribute($this->env, $this->source,         // line 48
($context["item"] ?? null), "fields", [], "any", false, false, false, 48)) && is_array($_v1) || $_v1 instanceof ArrayAccess ? ($_v1["color"] ?? null) : null), __("Color"),         // line 50
($context["field_options"] ?? null)]);
        // line 51
        yield "

   <div class=\"mx-n3 d-flex\">
      ";
        // line 54
        $context['_parent'] = $context;
        $context['_seq'] = CoreExtension::ensureTraversable(["a", "b"]);
        foreach ($context['_seq'] as $context["_key"] => $context["side"]) {
            // line 55
            yield "         ";
            $context["rand_side"] = Twig\Extension\CoreExtension::random($this->env->getCharset());
            // line 56
            yield "         ";
            $context["side_options"] = Twig\Extension\CoreExtension::merge(($context["field_options"] ?? null), ["full_width" => true, "rand" =>             // line 58
($context["rand_side"] ?? null)]);
            // line 60
            yield "         ";
            $context["html_side"] = ('' === $tmp = \Twig\Extension\CoreExtension::captureOutput((function () use (&$context, $macros, $blocks) {
                // line 61
                yield "            <div class=\"card mx-n2 border-0 shadow-none\">

               ";
                // line 63
                $context["side_heading"] = ('' === $tmp = \Twig\Extension\CoreExtension::captureOutput((function () use (&$context, $macros, $blocks) {
                    // line 64
                    yield "                  <h4 class=\"card-title\">
                     ";
                    // line 65
                    yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(Twig\Extension\CoreExtension::sprintf(__("Endpoint %s"), Twig\Extension\CoreExtension::upper($this->env->getCharset(), $context["side"])), "html", null, true);
                    yield "
                  </h4>
               ";
                    yield from [];
                })())) ? '' : new Markup($tmp, $this->env->getCharset());
                // line 68
                yield "               <div class=\"card-header\">
               ";
                // line 69
                yield $macros["fields"]->getTemplateForMacro("macro_field", $context, 69, $this->getSourceContext())->macro_field(...["",                 // line 71
($context["side_heading"] ?? null), "",                 // line 73
($context["side_options"] ?? null)]);
                // line 74
                yield "
               </div>

               <div class=\"card-body row\">
                  ";
                // line 78
                $context["dropdown_item"] = ('' === $tmp = \Twig\Extension\CoreExtension::captureOutput((function () use (&$context, $macros, $blocks) {
                    // line 79
                    yield "                     <span id=\"show_items_id_endpoint_";
                    yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($context["side"], "html", null, true);
                    yield "_field\" class=\"input_rear_listener\">
                        ";
                    // line 80
                    $context["current_itemtype"] = (($_v2 = CoreExtension::getAttribute($this->env, $this->source, ($context["item"] ?? null), "fields", [], "any", false, false, false, 80)) && is_array($_v2) || $_v2 instanceof ArrayAccess ? ($_v2[("itemtype_endpoint_" . $context["side"])] ?? null) : null);
                    // line 81
                    yield "                        ";
                    yield $macros["fields"]->getTemplateForMacro("macro_dropdownField", $context, 81, $this->getSourceContext())->macro_dropdownField(...[                    // line 82
($context["current_itemtype"] ?? null), ("items_id_endpoint_" .                     // line 83
$context["side"]), (($_v3 = CoreExtension::getAttribute($this->env, $this->source,                     // line 84
($context["item"] ?? null), "fields", [], "any", false, false, false, 84)) && is_array($_v3) || $_v3 instanceof ArrayAccess ? ($_v3[("items_id_endpoint_" . $context["side"])] ?? null) : null), "", Twig\Extension\CoreExtension::merge(                    // line 86
($context["side_options"] ?? null), ["no_label" => true])]);
                    // line 89
                    yield "
                     </span>
                  ";
                    yield from [];
                })())) ? '' : new Markup($tmp, $this->env->getCharset());
                // line 92
                yield "
                  ";
                // line 93
                yield $macros["fields"]->getTemplateForMacro("macro_dropdownArrayField", $context, 93, $this->getSourceContext())->macro_dropdownArrayField(...[("itemtype_endpoint_" .                 // line 94
$context["side"]), (($_v4 = CoreExtension::getAttribute($this->env, $this->source,                 // line 95
($context["item"] ?? null), "fields", [], "any", false, false, false, 95)) && is_array($_v4) || $_v4 instanceof ArrayAccess ? ($_v4[("itemtype_endpoint_" . $context["side"])] ?? null) : null), $this->extensions['Glpi\Application\View\Extension\PhpExtension']->call("Glpi\\Socket::getSocketLinkTypes"), _n("Asset", "Assets", 1), Twig\Extension\CoreExtension::merge(                // line 98
($context["side_options"] ?? null), ["add_field_html" =>                 // line 99
($context["dropdown_item"] ?? null)])]);
                // line 101
                yield "

                  ";
                // line 103
                $this->extensions['Glpi\Application\View\Extension\PhpExtension']->call("Ajax::updateItemOnSelectEvent", [(("dropdown_itemtype_endpoint_" .                 // line 104
$context["side"]) . ($context["rand_side"] ?? null)), (("show_items_id_endpoint_" .                 // line 105
$context["side"]) . "_field"), ($this->extensions['Glpi\Application\View\Extension\ConfigExtension']->config("root_doc") . "/ajax/cable.php"), ["itemtype" => "__VALUE__", "dom_name" => ("items_id_endpoint_" .                 // line 109
$context["side"]), "action" => "get_items_from_itemtype", "dom_rand" =>                 // line 111
($context["rand_side"] ?? null)]]);
                // line 114
                yield "
                  ";
                // line 115
                yield $macros["fields"]->getTemplateForMacro("macro_dropdownField", $context, 115, $this->getSourceContext())->macro_dropdownField(...["Glpi\\SocketModel", ("socketmodels_id_endpoint_" .                 // line 117
$context["side"]), (($_v5 = CoreExtension::getAttribute($this->env, $this->source,                 // line 118
($context["item"] ?? null), "fields", [], "any", false, false, false, 118)) && is_array($_v5) || $_v5 instanceof ArrayAccess ? ($_v5[("socketmodels_id_endpoint_" . $context["side"])] ?? null) : null), $this->extensions['Glpi\Application\View\Extension\ItemtypeExtension']->getItemtypeName("Glpi\\SocketModel"),                 // line 120
($context["side_options"] ?? null)]);
                // line 121
                yield "

                  ";
                // line 123
                yield $macros["fields"]->getTemplateForMacro("macro_dropdownField", $context, 123, $this->getSourceContext())->macro_dropdownField(...["Glpi\\Socket", ("sockets_id_endpoint_" .                 // line 125
$context["side"]), (($_v6 = CoreExtension::getAttribute($this->env, $this->source,                 // line 126
($context["item"] ?? null), "fields", [], "any", false, false, false, 126)) && is_array($_v6) || $_v6 instanceof ArrayAccess ? ($_v6[("sockets_id_endpoint_" . $context["side"])] ?? null) : null), $this->extensions['Glpi\Application\View\Extension\ItemtypeExtension']->getItemtypeName("Glpi\\Socket"), Twig\Extension\CoreExtension::merge(                // line 128
($context["side_options"] ?? null), ["condition" => ["socketmodels_id" => (($_v7 = CoreExtension::getAttribute($this->env, $this->source,                 // line 130
($context["item"] ?? null), "fields", [], "any", false, false, false, 130)) && is_array($_v7) || $_v7 instanceof ArrayAccess ? ($_v7[("socketmodels_id_endpoint_" . $context["side"])] ?? null) : null), "itemtype" => (($_v8 = CoreExtension::getAttribute($this->env, $this->source,                 // line 131
($context["item"] ?? null), "fields", [], "any", false, false, false, 131)) && is_array($_v8) || $_v8 instanceof ArrayAccess ? ($_v8[("itemtype_endpoint_" . $context["side"])] ?? null) : null), "items_id" => (($_v9 = CoreExtension::getAttribute($this->env, $this->source,                 // line 132
($context["item"] ?? null), "fields", [], "any", false, false, false, 132)) && is_array($_v9) || $_v9 instanceof ArrayAccess ? ($_v9[("items_id_endpoint_" . $context["side"])] ?? null) : null)], "used" => ((((($_v10 = CoreExtension::getAttribute($this->env, $this->source,                 // line 134
($context["item"] ?? null), "fields", [], "any", false, false, false, 134)) && is_array($_v10) || $_v10 instanceof ArrayAccess ? ($_v10[("items_id_endpoint_" . $context["side"])] ?? null) : null) > 0)) ? ($this->extensions['Glpi\Application\View\Extension\PhpExtension']->call("Glpi\\Socket::getSocketAlreadyLinked", [(($_v11 = CoreExtension::getAttribute($this->env, $this->source, ($context["item"] ?? null), "fields", [], "any", false, false, false, 134)) && is_array($_v11) || $_v11 instanceof ArrayAccess ? ($_v11[("itemtype_endpoint_" . $context["side"])] ?? null) : null), (($_v12 = CoreExtension::getAttribute($this->env, $this->source, ($context["item"] ?? null), "fields", [], "any", false, false, false, 134)) && is_array($_v12) || $_v12 instanceof ArrayAccess ? ($_v12[("items_id_endpoint_" . $context["side"])] ?? null) : null)])) : ([]))])]);
                // line 136
                yield "

                  ";
                // line 138
                $context["asset_breadcrumb"] = ('' === $tmp = \Twig\Extension\CoreExtension::captureOutput((function () use (&$context, $macros, $blocks) {
                    // line 139
                    yield "                     <span id=\"show_";
                    yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($context["side"], "html", null, true);
                    yield "_asset_breadcrumb\">
                        ";
                    // line 140
                    if ((Twig\Extension\CoreExtension::length($this->env->getCharset(), (($_v13 = CoreExtension::getAttribute($this->env, $this->source, ($context["item"] ?? null), "fields", [], "any", false, false, false, 140)) && is_array($_v13) || $_v13 instanceof ArrayAccess ? ($_v13[("items_id_endpoint_" . $context["side"])] ?? null) : null)) > 0)) {
                        // line 141
                        yield "                           ";
                        yield $this->extensions['Glpi\Application\View\Extension\PhpExtension']->call(((($_v14 = CoreExtension::getAttribute($this->env, $this->source, ($context["item"] ?? null), "fields", [], "any", false, false, false, 141)) && is_array($_v14) || $_v14 instanceof ArrayAccess ? ($_v14[("itemtype_endpoint_" . $context["side"])] ?? null) : null) . "::renderDcBreadcrumb"), [(($_v15 = CoreExtension::getAttribute($this->env, $this->source,                         // line 142
($context["item"] ?? null), "fields", [], "any", false, false, false, 142)) && is_array($_v15) || $_v15 instanceof ArrayAccess ? ($_v15[("items_id_endpoint_" . $context["side"])] ?? null) : null)]);
                        // line 143
                        yield "
                        ";
                    }
                    // line 145
                    yield "                     </span>

                     <script>
                        //listener to remove socket selector and breadcrumb
                        \$(document).on('change', '#dropdown_itemtype_endpoint_";
                    // line 149
                    yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($context["side"], "html", null, true);
                    yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(($context["rand_side"] ?? null), "html", null, true);
                    yield "', function(e) {
                           \$('#show_";
                    // line 150
                    yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($context["side"], "html", null, true);
                    yield "_asset_breadcrumb').empty();
                           \$('#show_rear_sockets_field').empty();
                        });

                        //listener to refresh socket selector and breadcrumb
                        \$(document).on('change', '#dropdown_items_id_endpoint_";
                    // line 155
                    yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($context["side"], "html", null, true);
                    yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(($context["rand_side"] ?? null), "html", null, true);
                    yield "', function(e) {
                           var items_id = \$('#dropdown_items_id_endpoint_";
                    // line 156
                    yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($context["side"], "html", null, true);
                    yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(($context["rand_side"] ?? null), "html", null, true);
                    yield "').find(':selected').val();
                           var itemtype = \$('#dropdown_itemtype_endpoint_";
                    // line 157
                    yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($context["side"], "html", null, true);
                    yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(($context["rand_side"] ?? null), "html", null, true);
                    yield "').find(':selected').val();
                           var socketmodels_id = \$('#dropdown_socketmodels_id_endpoint_";
                    // line 158
                    yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($context["side"], "html", null, true);
                    yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(($context["rand_side"] ?? null), "html", null, true);
                    yield "').find(':selected').val();
                           refreshAssetBreadcrumb(itemtype, items_id, 'show_";
                    // line 159
                    yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($context["side"], "html", null, true);
                    yield "_asset_breadcrumb');
                           refreshSocketDropdown(itemtype, items_id, socketmodels_id, 'sockets_id_endpoint_";
                    // line 160
                    yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($context["side"], "html", null, true);
                    yield "');

                        });
                     </script>
                  ";
                    yield from [];
                })())) ? '' : new Markup($tmp, $this->env->getCharset());
                // line 165
                yield "                  ";
                yield $macros["fields"]->getTemplateForMacro("macro_htmlField", $context, 165, $this->getSourceContext())->macro_htmlField(...["position",                 // line 167
($context["asset_breadcrumb"] ?? null), __("Position"),                 // line 169
($context["side_options"] ?? null)]);
                // line 170
                yield "
               </div>
            </div>
         ";
                yield from [];
            })())) ? '' : new Markup($tmp, $this->env->getCharset());
            // line 174
            yield "
         ";
            // line 175
            yield $macros["fields"]->getTemplateForMacro("macro_noLabelField", $context, 175, $this->getSourceContext())->macro_noLabelField(...[            // line 176
($context["html_side"] ?? null)]);
            // line 177
            yield "
      ";
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_key'], $context['side'], $context['_parent']);
        $context = array_intersect_key($context, $_parent) + $_parent;
        // line 179
        yield "   </div>
";
        yield from [];
    }

    /**
     * @codeCoverageIgnore
     */
    public function getTemplateName(): string
    {
        return "pages/assets/cable.html.twig";
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
        return array (  284 => 179,  277 => 177,  275 => 176,  274 => 175,  271 => 174,  264 => 170,  262 => 169,  261 => 167,  259 => 165,  250 => 160,  246 => 159,  241 => 158,  236 => 157,  231 => 156,  226 => 155,  218 => 150,  213 => 149,  207 => 145,  203 => 143,  201 => 142,  199 => 141,  197 => 140,  192 => 139,  190 => 138,  186 => 136,  184 => 134,  183 => 132,  182 => 131,  181 => 130,  180 => 128,  179 => 126,  178 => 125,  177 => 123,  173 => 121,  171 => 120,  170 => 118,  169 => 117,  168 => 115,  165 => 114,  163 => 111,  162 => 109,  161 => 105,  160 => 104,  159 => 103,  155 => 101,  153 => 99,  152 => 98,  151 => 95,  150 => 94,  149 => 93,  146 => 92,  140 => 89,  138 => 86,  137 => 84,  136 => 83,  135 => 82,  133 => 81,  131 => 80,  126 => 79,  124 => 78,  118 => 74,  116 => 73,  115 => 71,  114 => 69,  111 => 68,  104 => 65,  101 => 64,  99 => 63,  95 => 61,  92 => 60,  90 => 58,  88 => 56,  85 => 55,  81 => 54,  76 => 51,  74 => 50,  73 => 48,  72 => 46,  68 => 44,  66 => 43,  65 => 41,  63 => 38,  56 => 37,  51 => 33,  49 => 35,  47 => 34,  40 => 33,);
    }

    public function getSourceContext(): Source
    {
        return new Source("", "pages/assets/cable.html.twig", "C:\\xampp\\htdocs\\glpi\\templates\\pages\\assets\\cable.html.twig");
    }
}
