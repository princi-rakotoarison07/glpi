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

/* install/post_update_step.html.twig */
class __TwigTemplate_3c56eb8218a174cda418897a258fcce7 extends Template
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
        if ((($tmp =  !($context["is_db_consistent"] ?? null)) && $tmp instanceof Markup ? (string) $tmp : $tmp)) {
            // line 36
            yield "    <div class=\"alert alert-important alert-danger my-2 mx-4\" role=\"alert\">
        <i class=\"fas fa-2x fa-exclamation-triangle align-middle\"></i>
        ";
            // line 38
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(__("The database schema is not consistent with the current GLPI version."), "html", null, true);
            yield "<br />
        ";
            // line 39
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(Twig\Extension\CoreExtension::sprintf(__("It is recommended to run the \"%s\" command to see the differences."), "php bin/console database:check_schema_integrity"), "html", null, true);
            yield "
    </div>
";
        }
        // line 42
        yield "
<h2>";
        // line 43
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(__("One last thing before starting"), "html", null, true);
        yield "</h2>

<p>
   ";
        // line 46
        yield ($context["glpinetwork"] ?? null);
        yield "
</p>

";
        // line 49
        if ((($tmp =  !($context["telemetry_enabled"] ?? null)) && $tmp instanceof Markup ? (string) $tmp : $tmp)) {
            // line 50
            yield "   <hr>
   <p>
      ";
            // line 52
            yield ($context["telemetry_info"] ?? null);
            yield "
   </p>
";
        }
        // line 55
        yield "
<hr>
<p>
   ";
        // line 58
        yield ($context["reference_info"] ?? null);
        yield "
</p>

<hr>
<form action=\"update.php\" method=\"post\" data-submit-once>
   <div class=\"text-center\">
      <button type=\"submit\" class=\"btn btn-primary\">
         <i class=\"fas fa-thumbs-up me-1\"></i>
         ";
        // line 66
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(__("Use GLPI"), "html", null, true);
        yield "
      </button>
   </div>

   <input type=\"hidden\" name=\"update_end\" value=\"1\">
   ";
        // line 71
        yield $macros["fields"]->getTemplateForMacro("macro_csrfField", $context, 71, $this->getSourceContext())->macro_csrfField(...[]);
        yield "
</form>
";
        yield from [];
    }

    /**
     * @codeCoverageIgnore
     */
    public function getTemplateName(): string
    {
        return "install/post_update_step.html.twig";
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
        return array (  117 => 71,  109 => 66,  98 => 58,  93 => 55,  87 => 52,  83 => 50,  81 => 49,  75 => 46,  69 => 43,  66 => 42,  60 => 39,  56 => 38,  52 => 36,  50 => 35,  47 => 34,  45 => 33,  42 => 32,);
    }

    public function getSourceContext(): Source
    {
        return new Source("", "install/post_update_step.html.twig", "D:\\xampp\\htdocs\\glpi\\templates\\install\\post_update_step.html.twig");
    }
}
