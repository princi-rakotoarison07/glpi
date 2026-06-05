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

/* components/itilobject/timeline/pending_reasons.html.twig */
class __TwigTemplate_af9f5bbf850599c769f9b2a466fbaafd extends Template
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
        if ((($tmp = $this->extensions['Glpi\Application\View\Extension\PhpExtension']->call("PendingReason_Item::canDisplayPendingReasonForItem", [($context["subitem"] ?? null)])) && $tmp instanceof Markup ? (string) $tmp : $tmp)) {
            // line 36
            yield "   ";
            $context["default_pending"] = $this->extensions['Glpi\Application\View\Extension\PhpExtension']->call("PendingReason::getDefault");
            // line 37
            yield "   ";
            $context["pending_item"] = $this->extensions['Glpi\Application\View\Extension\PhpExtension']->call("PendingReason_Item::getForItem", [($context["subitem"] ?? null), true]);
            // line 38
            yield "   ";
            $context["pending_item_parent"] = $this->extensions['Glpi\Application\View\Extension\PhpExtension']->call("PendingReason_Item::getForItem", [($context["item"] ?? null), true]);
            // line 39
            yield "   ";
            $context["pendingreasons_id"] = (((CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["pending_item"] ?? null), "fields", [], "any", false, true, false, 39), "pendingreasons_id", [], "array", true, true, false, 39) &&  !(null === (($_v0 = CoreExtension::getAttribute($this->env, $this->source, ($context["pending_item"] ?? null), "fields", [], "any", false, false, false, 39)) && is_array($_v0) || $_v0 instanceof ArrayAccess ? ($_v0["pendingreasons_id"] ?? null) : null)))) ? ((($_v1 = CoreExtension::getAttribute($this->env, $this->source, ($context["pending_item"] ?? null), "fields", [], "any", false, false, false, 39)) && is_array($_v1) || $_v1 instanceof ArrayAccess ? ($_v1["pendingreasons_id"] ?? null) : null)) : ((((CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["pending_item_parent"] ?? null), "fields", [], "any", false, true, false, 39), "pendingreasons_id", [], "array", true, true, false, 39) &&  !(null === (($_v2 = CoreExtension::getAttribute($this->env, $this->source, ($context["pending_item_parent"] ?? null), "fields", [], "any", false, false, false, 39)) && is_array($_v2) || $_v2 instanceof ArrayAccess ? ($_v2["pendingreasons_id"] ?? null) : null)))) ? ((($_v3 = CoreExtension::getAttribute($this->env, $this->source, ($context["pending_item_parent"] ?? null), "fields", [], "any", false, false, false, 39)) && is_array($_v3) || $_v3 instanceof ArrayAccess ? ($_v3["pendingreasons_id"] ?? null) : null)) : ((((CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["default_pending"] ?? null), "fields", [], "any", false, true, false, 39), "id", [], "array", true, true, false, 39) &&  !(null === (($_v4 = CoreExtension::getAttribute($this->env, $this->source, ($context["default_pending"] ?? null), "fields", [], "any", false, false, false, 39)) && is_array($_v4) || $_v4 instanceof ArrayAccess ? ($_v4["id"] ?? null) : null)))) ? ((($_v5 = CoreExtension::getAttribute($this->env, $this->source, ($context["default_pending"] ?? null), "fields", [], "any", false, false, false, 39)) && is_array($_v5) || $_v5 instanceof ArrayAccess ? ($_v5["id"] ?? null) : null)) : (0))))));
            // line 40
            yield "
   <div class=\"row\">
      <div class=\"col-12 col-sm-4\" title=\"";
            // line 42
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->extensions['Glpi\Application\View\Extension\ItemtypeExtension']->getItemtypeName("PendingReason"), "html", null, true);
            yield "\"
           data-bs-toggle=\"tooltip\" data-bs-placement=\"top\">
         ";
            // line 44
            $context["pendingreasons_lbl"] = new Markup("            <i class=\"ti ti-tags\"></i>
         ", $this->env->getCharset());
            // line 47
            yield "         ";
            $context["pending_reasons_id_script"] = ('' === $tmp = \Twig\Extension\CoreExtension::captureOutput((function () use (&$context, $macros, $blocks) {
                // line 48
                yield "            <script>
               var myCollapsible = \$('#pending-reasons-setup-";
                // line 49
                yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(($context["rand"] ?? null), "html", null, true);
                yield "')[0];
               myCollapsible.addEventListener('show.bs.collapse', function () {
                  \$('#pending-reasons-control-";
                // line 51
                yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(($context["rand"] ?? null), "html", null, true);
                yield "').addClass('flex-fill');
               });
               myCollapsible.addEventListener('hide.bs.collapse', function () {
                  \$('#pending-reasons-control-";
                // line 54
                yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(($context["rand"] ?? null), "html", null, true);
                yield "').removeClass('flex-fill');
               });
            </script>
         ";
                yield from [];
            })())) ? '' : new Markup($tmp, $this->env->getCharset());
            // line 58
            yield "         ";
            yield $macros["fields"]->getTemplateForMacro("macro_dropdownField", $context, 58, $this->getSourceContext())->macro_dropdownField(...["PendingReason", "pendingreasons_id",             // line 61
($context["pendingreasons_id"] ?? null),             // line 62
($context["pendingreasons_lbl"] ?? null), ["label_class" => "col-1", "input_class" => "col-10 ms-1", "rand" =>             // line 66
($context["rand"] ?? null), "mb" => "", "hide_if_no_elements" => true, "addicon" => false, "comments" => false, "width" => "95%", "field_class" => "flex-nowrap", "add_field_html" =>             // line 73
($context["pending_reasons_id_script"] ?? null), "aria_label" => _n("Pending reason", "Pending reasons", 1)]]);
            // line 76
            yield "
         <script type=\"module\">
            // Initialize a flag to check if the pending reasons dropdown has been initialized
            let pendingReasonsInitalized";
            // line 79
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(($context["rand"] ?? null), "html", null, true);
            yield " = false;

            let handlePendingReasonsChange";
            // line 81
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(($context["rand"] ?? null), "html", null, true);
            yield " = async () => {
               let pending_val = \$('#dropdown_pendingreasons_id";
            // line 82
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(($context["rand"] ?? null), "html", null, true);
            yield "').val();

               if (pending_val > 0) {
                  \$('#pending-reasons-more_options_";
            // line 85
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(($context["rand"] ?? null), "html", null, true);
            yield "').addClass('show');
                  let data = await \$.ajax({
                     url: '";
            // line 87
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->extensions['Glpi\Application\View\Extension\RoutingExtension']->path("ajax/pendingreason.php"), "html", null, true);
            yield "',
                     type: 'POST',
                     data: {
                        pendingreasons_id: pending_val
                     }
                  });

                  \$('#dropdown_followup_frequency";
            // line 94
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(($context["rand"] ?? null), "html", null, true);
            yield "')
                     .val(data.followup_frequency)
                     .trigger('change');
                  \$('#dropdown_followups_before_resolution";
            // line 97
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(($context["rand"] ?? null), "html", null, true);
            yield "')
                     .val(data.followups_before_resolution)
                     .trigger('change');
               } else {
                  \$('#pending-reasons-more_options_";
            // line 101
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(($context["rand"] ?? null), "html", null, true);
            yield "').removeClass('show');
               }
            }

            await handlePendingReasonsChange";
            // line 105
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(($context["rand"] ?? null), "html", null, true);
            yield "();

            // If this is the first time the dropdown is being initialized
            // Mark the dropdown as initialized and reset the form modification flag to avoid triggering the unsaved changes warning
            if (!pendingReasonsInitalized";
            // line 109
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(($context["rand"] ?? null), "html", null, true);
            yield ") {
               pendingReasonsInitalized";
            // line 110
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(($context["rand"] ?? null), "html", null, true);
            yield " = true;
               setHasUnsavedChanges(false);
            }

            \$('#dropdown_pendingreasons_id";
            // line 114
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(($context["rand"] ?? null), "html", null, true);
            yield "').change(handlePendingReasonsChange";
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(($context["rand"] ?? null), "html", null, true);
            yield ");
         </script>
      </div>

      <div class=\"collapse col-12 col-sm-8 ";
            // line 118
            yield (((($tmp = ($context["pendingreasons_id"] ?? null)) && $tmp instanceof Markup ? (string) $tmp : $tmp)) ? ("show") : (""));
            yield "\" id=\"pending-reasons-more_options_";
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(($context["rand"] ?? null), "html", null, true);
            yield "\">
         <div class=\"row\">
            <div class=\"col-12 col-sm-6\" title=\"";
            // line 120
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(__("Automatic follow-up"), "html", null, true);
            yield "\"
                  data-bs-toggle=\"tooltip\" data-bs-placement=\"top\">
               ";
            // line 122
            $context["pendingreasons_frequency_field"] = $this->extensions['Glpi\Application\View\Extension\PhpExtension']->call("PendingReason::displayFollowupFrequencyfield", [(((($tmp =             // line 123
($context["pending_item"] ?? null)) && $tmp instanceof Markup ? (string) $tmp : $tmp)) ? ((($_v6 = CoreExtension::getAttribute($this->env, $this->source, ($context["pending_item"] ?? null), "fields", [], "any", false, false, false, 123)) && is_array($_v6) || $_v6 instanceof ArrayAccess ? ($_v6["followup_frequency"] ?? null) : null)) : ((((($tmp = ($context["pending_item_parent"] ?? null)) && $tmp instanceof Markup ? (string) $tmp : $tmp)) ? ((($_v7 = CoreExtension::getAttribute($this->env, $this->source, ($context["pending_item_parent"] ?? null), "fields", [], "any", false, false, false, 123)) && is_array($_v7) || $_v7 instanceof ArrayAccess ? ($_v7["followup_frequency"] ?? null) : null)) : (null)))), "", ["rand" =>             // line 126
($context["rand"] ?? null)], false]);
            // line 130
            yield "               ";
            $context["pendingreasons_frequency_lbl"] = new Markup("                  <i class=\"ti ti-reload\"></i>
               ", $this->env->getCharset());
            // line 133
            yield "               ";
            yield $macros["fields"]->getTemplateForMacro("macro_field", $context, 133, $this->getSourceContext())->macro_field(...["followup_frequency",             // line 135
($context["pendingreasons_frequency_field"] ?? null),             // line 136
($context["pendingreasons_frequency_lbl"] ?? null), ["field_class" => "", "label_class" => "col-1", "input_class" => "col-10 ms-1", "rand" =>             // line 141
($context["rand"] ?? null), "mb" => ""]]);
            // line 144
            yield "
            </div>
            <div class=\"col-12 col-sm-6\" title=\"";
            // line 146
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(__("Automatic resolution"), "html", null, true);
            yield "\"
                 data-bs-toggle=\"tooltip\" data-bs-placement=\"top\">
               ";
            // line 148
            $context["pendingreasons_resolution_field"] = $this->extensions['Glpi\Application\View\Extension\PhpExtension']->call("PendingReason::displayFollowupsNumberBeforeResolutionField", [(((($tmp =             // line 149
($context["pending_item"] ?? null)) && $tmp instanceof Markup ? (string) $tmp : $tmp)) ? ((($_v8 = CoreExtension::getAttribute($this->env, $this->source, ($context["pending_item"] ?? null), "fields", [], "any", false, false, false, 149)) && is_array($_v8) || $_v8 instanceof ArrayAccess ? ($_v8["followups_before_resolution"] ?? null) : null)) : ((((($tmp = ($context["pending_item_parent"] ?? null)) && $tmp instanceof Markup ? (string) $tmp : $tmp)) ? ((($_v9 = CoreExtension::getAttribute($this->env, $this->source, ($context["pending_item_parent"] ?? null), "fields", [], "any", false, false, false, 149)) && is_array($_v9) || $_v9 instanceof ArrayAccess ? ($_v9["followups_before_resolution"] ?? null) : null)) : (null)))), "", ["rand" =>             // line 152
($context["rand"] ?? null)], false]);
            // line 156
            yield "               ";
            $context["pendingreasons_resolution_lbl"] = new Markup("                  <i class=\"ti ti-check\"></i>
               ", $this->env->getCharset());
            // line 159
            yield "               ";
            yield $macros["fields"]->getTemplateForMacro("macro_field", $context, 159, $this->getSourceContext())->macro_field(...["followups_before_resolution",             // line 161
($context["pendingreasons_resolution_field"] ?? null),             // line 162
($context["pendingreasons_resolution_lbl"] ?? null), ["field_class" => "", "label_class" => "col-1", "input_class" => "col-10 ms-1", "rand" =>             // line 167
($context["rand"] ?? null), "mb" => ""]]);
            // line 170
            yield "
            </div>
         </div>
      </div>
   </div>
";
        }
        yield from [];
    }

    /**
     * @codeCoverageIgnore
     */
    public function getTemplateName(): string
    {
        return "components/itilobject/timeline/pending_reasons.html.twig";
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
        return array (  239 => 170,  237 => 167,  236 => 162,  235 => 161,  233 => 159,  229 => 156,  227 => 152,  226 => 149,  225 => 148,  220 => 146,  216 => 144,  214 => 141,  213 => 136,  212 => 135,  210 => 133,  206 => 130,  204 => 126,  203 => 123,  202 => 122,  197 => 120,  190 => 118,  181 => 114,  174 => 110,  170 => 109,  163 => 105,  156 => 101,  149 => 97,  143 => 94,  133 => 87,  128 => 85,  122 => 82,  118 => 81,  113 => 79,  108 => 76,  106 => 73,  105 => 66,  104 => 62,  103 => 61,  101 => 58,  93 => 54,  87 => 51,  82 => 49,  79 => 48,  76 => 47,  73 => 44,  68 => 42,  64 => 40,  61 => 39,  58 => 38,  55 => 37,  52 => 36,  50 => 35,  47 => 34,  45 => 33,  42 => 32,);
    }

    public function getSourceContext(): Source
    {
        return new Source("", "components/itilobject/timeline/pending_reasons.html.twig", "C:\\xampp\\htdocs\\glpi\\templates\\components\\itilobject\\timeline\\pending_reasons.html.twig");
    }
}
